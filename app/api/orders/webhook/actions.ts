"use server"


import prisma from "@app/lib/db/prisma";
import {cartItem} from "@app/lib/types";
import { getCartByCartId, ShoppingCart} from "@app/lib/db/cart";
import {PaymentType, TransportType} from "@node_modules/@prisma/client";
import {formatPrice} from "@utils/helper";
import {NextResponse} from "@node_modules/next/server";

const nodemailer = require('nodemailer');

export async function createOrder(cartItems: cartItem[], userInfo: string, cartId: string, transportId: number, paymentId: number): Promise<{ error?: string[], wasCreated: boolean }> {

    try {
        const {firstname, lastname, email, phone, address, city, zip} = JSON.parse(userInfo)
        let newGeneratedOrderId: number = 0;
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
            where: {id: cartId},
        });

        // Check if all necessary objects exist before creating the user
        if (!transportObject || !paymentObject || !cartObject) {
            throw new Error('Could not find necessary objects for order creation');
        }

        const cart = await getCartByCartId(cartId as string)

        // Transaction to create order to mongo DB
        await prisma.$transaction(async (tx) => {
            // Create transport info
            const transportInfo = await tx.transportInfo.create({
                data: {
                    address: address,
                    city: city,
                    zip: zip,
                    transportTypeId: transportObject?.id,
                },
            });

             newGeneratedOrderId = await prisma.order.aggregate({
                _max: {generatedOrderId: true}
            }).then(result => Number(result._max.generatedOrderId) + 1 ?? 0);

            const newOrder = await tx.order.create({
                data: {
                    generatedOrderId: newGeneratedOrderId,
                    orderPrice: Number(cart?.subtotal) + Number(transportObject.price) + Number(paymentObject.price),
                    wasOrderCompleted: true,
                    wasOrderPaid: true
                }
            });

            cartItems.map(async (item: cartItem) => {
                await tx.orderItem.create({
                    data: {
                        orderId: newOrder?.id,
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }
                })
            })

            // Create user
            await tx.user.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    orderId: newOrder?.id,
                    cartId: newOrder?.id,
                    paymentTypeId: paymentObject?.id,
                    transportInfoId: transportInfo?.id,
                }
            });
        });

        // Send notification email
        await sendEmail(email, cart, transportObject, paymentObject, newGeneratedOrderId);
        return {wasCreated: true};

    } catch (error) {
        return {error: ["Bohužel nastala chyba, objednávku nelze vytvořit, obraťte se na podporu. Děkujeme za pochopení!"], wasCreated: false};
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