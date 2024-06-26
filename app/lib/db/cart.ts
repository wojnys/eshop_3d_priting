"use server"
import prisma from "@/app/lib/db/prisma"
import {cookies} from "@node_modules/next/dist/client/components/headers";
import {Cart, Prisma} from "@prisma/client";

export type CartWithProducts = Prisma.CartGetPayload<{
    include: {items: {include: {product: true}}}
}>

export type CartWithProduct = Prisma.CartItemGetPayload<{
    include: {product: true}
}>

export type ShoppingCart = CartWithProducts & {
    size: number
    subtotal: number
}

export async function getCart(): Promise <ShoppingCart | null> {
    const localCartId = cookies().get('localCartId')?.value;
    const cart = localCartId ? await prisma.cart.findUnique({
        where: {id: localCartId, wasOrderCompleted: false}, // Only orders which are not completed are possible to change
        include: {items: {include: {product: true}}}
    }) : null;
    if (!cart) {
        return null;
    }
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    }
}

export async function getCartByCartId(cartId: string): Promise <ShoppingCart | null> {
    const cart =  await prisma.cart.findUnique({
        where: {id: cartId, wasOrderCompleted: false}, // Only orders which are not completed are possible to change
        include: {items: {include: {product: true}}}
    });
    if (!cart) {
        return null;
    }
    return {
        ...cart,
        size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
    }
}

// Creates new shopping cart
export async function createCart(): Promise<ShoppingCart> {
    const newCart = await prisma.cart.create({
        data: {},
    })

    // Cookie of cart.id need encryption, it is dangerous to keep id of cart non encrypted
    cookies().set('localCartId', newCart.id)

    return {
        ...newCart,
        items: [],
        size: 0,
        subtotal: 0
    };
}
