"use server"

import {createCart, getCart} from "@app/lib/db/cart";
import prisma from "@app/lib/db/prisma";
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";
import {getProductStockQuantity} from "@app/lib/db/stock";

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

            const productStockQuantity = await getProductStockQuantity(productId) ?? 0 ;
            if(productStockQuantity >= quantity ) {
                await prisma.cartItem.update({
                    where: {id: itemInCart.id},
                    data: {quantity: quantity}
                })
                revalidatePath("/eshop/cart");
            } else {
                revalidatePath("/eshop/cart");
                return { success: false, message: `Není skladem nebo je dostupných pouze ${productStockQuantity} kus/kusů`, stockQuantityAvailable: productStockQuantity};
            }
        }
    }
}