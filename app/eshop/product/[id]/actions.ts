'use server';
import {createCart, getCart} from "@app/lib/db/cart";
import prisma from "@app/lib/db/prisma";
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";

export async function incrementProductQuantity(productId: string) {
    const cart = await getCart() ?? await createCart();

    const itemInCart = cart.items.find(item => item.productId === productId);

    if(itemInCart) {
        await prisma.cartItem.update({
            where: {id:itemInCart.id},
            data: {quantity: { increment: 1 }}
        })
    } else {
        await prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity: 1
            }
        })
    }

    revalidatePath("/eshop/products/[id]");
}