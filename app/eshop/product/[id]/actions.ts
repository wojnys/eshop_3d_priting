'use server';
import {createCart, getCart} from "@app/lib/db/cart";
import prisma from "@app/lib/db/prisma";
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";
import {getProductStockQuantity} from "@app/lib/db/stock";

export async function incrementProductQuantity(productId: string) {
    const cart = await getCart() ?? await createCart();
    const itemInStockQuantity = await getProductStockQuantity(productId) ?? 0;
    console.log(itemInStockQuantity);

    const currentItemInCart = cart.items.find(item => item.productId === productId);
    console.log(currentItemInCart?.quantity);

    let itemInCart = null;
    // Check is product is available in STOCK
    if ((itemInStockQuantity >= (currentItemInCart?.quantity ?? 0) + 1)) {
        itemInCart = cart.items.find(item => item.productId === productId);

        if (itemInCart) {
            await prisma.cartItem.update({
                where: {id: itemInCart.id},
                data: {quantity: {increment: 1}}
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
        return { success: true, message: 'Přidáno do košíku', status: 200 };
    } else {
        revalidatePath("/eshop/products/[id]");
        return { success: false, message: 'Produkt aktuálně není skladem', status: 400 };
    }
}