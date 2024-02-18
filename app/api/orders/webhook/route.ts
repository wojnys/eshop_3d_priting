
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// }

import Stripe from 'stripe';
import {headers} from 'next/headers';
import {NextResponse} from "@node_modules/next/server";
import prisma from "@app/lib/db/prisma";


const stripe = new Stripe(process.env.NEXT_PRIVATE_API_KEY_STRIPE!)

async function getCartItems(lineItems: any) {
    return new Promise(async (resolve, reject) => {
        try {
            let cartItems: any[] = [];

            // Map each line item to a Promise that retrieves product details
            const promises = lineItems?.data?.map(async (item: any) => {
                const product = await stripe.products.retrieve(item.price.product);
                const productId = product.metadata.productId;

                console.log("product", product);
                console.log("item", item);

                cartItems.push({
                    productId: productId,
                    name: product.name,
                    image: product.images[0],
                    price: item.price.unit_amount / 100,
                    quantity: item.quantity,
                    cartId: product.metadata.cartId
                });
            });

            // Wait for all promises to resolve
            await Promise.all(promises);

            // Resolve with the array of cart items
            resolve(cartItems);
        } catch (error) {
            reject(error);
        }
    });
}

export async function POST(req: Request) {
    const body = await req.text();
    const sig = headers().get('Stripe-Signature') as string;
    const webhookSecret = process.env.NEXT_SECRET_WEBHOOK_STRIPE!;
    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
        if (event.type === "checkout.session.completed") {
            const session = event.data.object

            const lineItems = await stripe.checkout.sessions.listLineItems(
                event.data.object.id
            )
            const cartItems:any = await getCartItems(lineItems)
            const cartId = cartItems[0].cartId

            await prisma.cart.update({
                where: {id: cartId},
                data: {
                    wasOrderCompleted: true,
                    wasOrderPaid: true
                }
            })
        }
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return NextResponse.json(
            {error: err},
            {
                status: 500,
            }
        );
    }
    return NextResponse.json({received: true})
}