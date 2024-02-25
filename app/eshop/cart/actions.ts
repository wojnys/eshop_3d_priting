"use server"

import {createCart, getCart, ShoppingCart} from "@app/lib/db/cart";
import prisma from "@app/lib/db/prisma";
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";
import {getProductStockQuantity} from "@app/lib/db/stock";
import {cookies} from "@node_modules/next/dist/client/components/headers";
import {validationUserOrderScheme} from "@app/lib/types";
import {PaymentType, TransportType} from "@prisma/client";

const nodemailer = require('nodemailer');


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

    try {
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

        // await createOrder(cart?.items, {} , localCartId,Number(metadata.transport_number_id),Number(metadata.payment_number_id));
        cookies().delete('localCartId');
        return {success: "Validní data"};

    } catch (error) {
        console.error(error);
        return {error: ["Bohužel nastala chyba, objednávku nelze vytvořit, obraťte se na podporu. Děkujeme za pochopení!"]};
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