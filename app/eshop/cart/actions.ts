"use server"

import {createCart, getCart, ShoppingCart} from "@app/lib/db/cart";
import prisma from "@app/lib/db/prisma";
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";
import {getProductStockQuantity} from "@app/lib/db/stock";
import {cookies} from "@node_modules/next/dist/client/components/headers";
import {validationUserOrderScheme} from "@app/lib/types";
import {PaymentType, TransportType} from "@prisma/client";

const nodemailer = require('nodemailer');
import {NextResponse} from 'next/server';
import {formatPrice} from "@utils/helper";
import {checkout} from "@checkout";

export async function setProductQuantity(productId: string, quantity: number) {
    const cart = await getCart() ?? await createCart();

    const itemInCart = cart.items.find(item => item.productId === productId);

    if (quantity === 0) {
        if (itemInCart) {
            await prisma.cartItem.delete({
                where: {id: itemInCart.id}
            })
        }
        revalidatePath("/eshop/cart");
    } else {
        if (itemInCart) {
            // I need to check actual quantity of products in STOCK and compare it with quantity in cart
            // I need to create new collection in db for STOCK

            const productStockQuantity = await getProductStockQuantity(productId) ?? 0;
            if (productStockQuantity >= quantity) {
                await prisma.cartItem.update({
                    where: {id: itemInCart.id},
                    data: {quantity: quantity}
                })
                revalidatePath("/eshop/cart");
            } else {
                revalidatePath("/eshop/cart");
                return {
                    success: false,
                    message: `Není skladem nebo je dostupných pouze ${productStockQuantity} kus/kusů`,
                    stockQuantityAvailable: productStockQuantity
                };
            }
        }
    }
}

export async function createOrder(formData: FormData, transportId: string | null, paymentId: string | null): Promise<{
    error?: string[],
    success?: string
}> {

    const cart = await getCart();

    const firstname = formData.get("firstname")?.toString();
    const lastname = formData.get("lastname")?.toString();
    const email = formData.get("email")?.toString();
    const phone = Number(formData.get("phone") || 0);

    const address = formData.get("address")?.toString();
    const city = formData.get("city")?.toString();
    const zip = Number(formData.get("zip") || 0)

    const localCartId = cookies().get('localCartId')?.value.toString();

    // User Form data Validation
    const validationResult = validationUserOrderScheme.safeParse({
        firstname,
        lastname,
        email,
        phone,
        address,
        city,
        zip
    });
    if (!validationResult.success) {
        let errorMessages: string[] = [];
        validationResult.error.issues.forEach(issue => {
            errorMessages.push(issue.message);
        });

        return {error: errorMessages};
    }

    // Check quantity in stock
    const canUpdate = await canUpdateStockQuantity(cart);
    if (!canUpdate.canUpdate) {
        return {error: canUpdate.error};
    }

    // Transaction to create order to mongo DB
    const result = await prisma.$transaction(async prisma => {
        try {
            // Fetch transport object
            const transportObject = await prisma.transportType.findFirst({
                where: {numberId: Number(transportId)}
            });

            // Fetch payment object
            const paymentObject = await prisma.paymentType.findFirst({
                where: {numberId: Number(paymentId)}
            });

            // Fetch cart object
            const cartObject = await prisma.cart.findFirst({
                where: {id: localCartId},
            });

            // Check if all necessary objects exist before creating the user
            if (!transportObject || !paymentObject || !cartObject || !localCartId) {
                throw new Error('Could not find necessary objects for order creation');
            }

            // Create transport info
            const transportInfo = await prisma.transportInfo.create({
                data: {
                    address: address ?? "",
                    city: city ?? "",
                    zip: zip ?? 0,
                    transportTypeId: transportObject?.id,
                },
            });

            // Create user
            const user = await prisma.user.create({
                data: {
                    firstname: firstname ?? "",
                    lastname: lastname ?? "",
                    email: email ?? "",
                    phone: phone,
                    cartId: cartObject?.id,
                    paymentTypeId: paymentObject?.id,
                    transportInfoId: transportInfo?.id
                }
            });

            // Get last generated order id
            const newGeneratedOrderId = await prisma.cart.aggregate({
                _max: {generatedOrderId: true}
            }).then(result => Number(result._max.generatedOrderId) + 1 ?? 0);
            // Update order
            await prisma.cart.update({
                where: {id: localCartId},
                data: {
                    wasOrderCompleted: true,
                    cartPrice: Number(cart?.subtotal) + Number(paymentObject.price) + Number(transportObject.price),
                    generatedOrderId: newGeneratedOrderId
                }
            })

            cookies().delete('localCartId');

            // Send notification email
            await sendEmail(email, cart, transportObject, paymentObject, newGeneratedOrderId);

            return {success: true, transportInfo, user};
        } catch (error) {
            console.error(error);
            return {success: false}
        }
    });

    if (result?.success) {
        return {success: "Objednávka byla úspěšně vytvořena, zkontrolujte svůj email pro potvrzení objednávky. Děkujeme za nákup!"};
    } else {
        return {error: ["Bohužel nastala chyba, objednávku nelze vytvořit, obraťte se na podporu. Děkujeme za pochopení!"]};
    }
}

export async function sendEmail(email: string | undefined, cartRecap: ShoppingCart | null, transportRecap: TransportType | null, paymentRecap: PaymentType | null, newGeneratedOrderId: number) {
    const username = process.env.NEXT_PUBLIC_EMAIL_USERNAME;
    const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.seznam.cz', // Seznam.cz SMTP server
            port: 465, // Port for secure SMTP
            secure: true, // Use secure connection (TLS/SSL)
            auth: {
                user: username, // Your Seznam.cz email address
                pass: password, // Your Seznam.cz email password
            },
        });

        const mailOptions = {
            from: username, // Your Seznam.cz email address
            to: [username, email], // Send email to user and to admin
            subject: 'Potvrzení objednávky',
            html: `
        <h1>Dobrý den, děkujeme za objednávku</h1>
        <h3>Číslo vaší objednávky: ${newGeneratedOrderId}</h3>
        <div style="display: flex; justify-content: end; width: 100%; max-width: 350px;">
            <div style="display: flex; flex-direction: column; width: 100%;">
                ${
                cartRecap?.items.map((item, index) => `
                        <div style="border: 1px solid #ccc; border-radius: 5px; display: flex; align-items: center; margin-bottom: 10px;" key=${index}>
                            <div style="padding: 5px;">
                                <img src=${item.product.imageUrl} alt=${item.product.name} width="50" height="50"/>
                            </div>
                            <div style="display: flex; flex-direction: column; padding: 5px;">
                                <div style="display: flex;">
                                    <p style="margin-right: 5px;">${item.quantity}x</p>
                                    <p>${item.product.title} ${item.product.name}</p>
                                </div>
                                <div>
                                    <p style="font-weight: bold;">${formatPrice(item.product.price * item.quantity)}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')
            }
                          <div style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; display: flex; flex-direction: column;">
                                <h1 style="font-size: 16px;">Doprava</h1>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="display: flex; align-items: center; gap: 1;">
                                        <p>${transportRecap?.name}</p>
                                    </div>
                                    <p>${formatPrice(Number(transportRecap?.price))}</p>
                                </div>
                            </div>
                            <div style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; display: flex; flex-direction: column;">
                                <h1 style="font-size: 16px;">Platba</h1>
                                <div style="display: flex; justify-content: space-between;">
                                    <div style="display: flex; align-items: center; gap: 1;">
                                        <p>${paymentRecap?.name}</p>
                                    </div>
                                    <p>${formatPrice(Number(paymentRecap?.price))}</p>
                                </div>
                            </div>
                <div style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; display: flex; justify-content: space-between;">
                    <h1 style="font-size: 16px;">Celkem</h1>
                    <h1 style="font-size: 16px; font-weight: bold;">${formatPrice(Number(cartRecap?.subtotal) + Number(paymentRecap?.price) + Number(transportRecap?.price))}</h1>
                </div>
            </div>
        </div>
    `
        };

        await transporter.sendMail(mailOptions, (error: any, info: any) => {
            if (error) {
                return error;
            }
        });

        return NextResponse.json({message: "Success: email was sent"})

    } catch (error) {
        console.log(error)
        NextResponse.json({message: "COULD NOT SEND MESSAGE"})
    }
}

// Check if all items from cart are in stock
export async function canUpdateStockQuantity(cart: ShoppingCart | null): Promise<{
    canUpdate: boolean,
    error?: string[]
}> {
    let canUpdate = true;
    if (cart) {
        let canUpdate: boolean = true;

        for (const item of cart.items) {
            const productStockQuantity = await prisma.stock.findFirst({
                where: {productId: item.productId}
            });

            if (productStockQuantity?.quantity === undefined || productStockQuantity.quantity < item.quantity) {
                canUpdate = false;
                return {
                    canUpdate: false,
                    error: ["Je nám líto, ale na skladě nemáme dostatak množství produktu, který jste si vybrali."]
                };
            }
        }

        if (canUpdate) {
            try {
                await Promise.all(cart.items.map(async (item) => {
                    const productStockQuantity = await prisma.stock.findFirst({
                        where: {productId: item.productId}
                    });
                    if (productStockQuantity) {
                        await prisma.stock.update({
                            where: {id: productStockQuantity.id},
                            data: {quantity: productStockQuantity.quantity - item.quantity}
                        });
                    }
                }))
            } catch (error) {
                console.error(error);
                return {
                    canUpdate: false,
                    error: ["Je nám líto, ale objednávku momentálně nelze dokončit, zkuste to prosím později. Děkujeme za pochopení!"]
                };
            }
        }
    }

    return {canUpdate: canUpdate};
}