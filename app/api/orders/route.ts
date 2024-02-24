import Stripe from 'stripe';
import {NextResponse} from "@node_modules/next/server";
// @ts-ignore
const stripe: Stripe | undefined = new Stripe(process.env.NEXT_PRIVATE_API_KEY_STRIPE)

// Notice the funciton definiton:
export async function POST(req: any) {
    try {
        const body = await req.json();

        const shippingInfo = body?.shippingInfo

        const userInfo = body?.userInfo as string
        const transportNumberId = body?.transportId as string
        const paymentNumberId = body?.paymentId as string

        // Platebni brana

        const lineItems = body?.items?.map((item: any) => {
            return {
                price_data: {
                    currency: 'czk',
                    product_data: {
                        name: item.product.name,
                        images: [item.product.imageUrl],
                        metadata: {productId: item.product.id, cartId: item.cartId}
                    },
                    unit_amount: item.product.price * 100,
                },
                // tax_rates: ['txr_1OktAyGay19qP7zDMCNjLtrW'],
                quantity: item.quantity
            }
        })

        const session = await stripe?.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${process.env.WEB_URL}/eshop?order-was-paid=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.WEB_URL}/eshop`,
            metadata: {
                user_info: JSON.stringify(userInfo),
                transport_number_id: transportNumberId,
                payment_number_id: paymentNumberId,
            },
            shipping_options: [
                {
                    shipping_rate: "shr_1Okt5bGay19qP7zDOD44n8on"
                }
            ],
            line_items: lineItems
        })


        // Get all admins using Prisma
        return NextResponse.json({url: session?.url}, {
            status: 200,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error: error},
            {
                status: 500,
            }
        );
    }
}