import Stripe from 'stripe';
import {NextResponse} from "@node_modules/next/server";
// @ts-ignore
const stripe: Stripe | undefined = new Stripe(process.env.NEXT_PRIVATE_API_KEY_STRIPE)

// Notice the funciton definiton:
export async function POST(req: any) {
    try {
        const body = await req.json();
        console.log(body.items)

        const shippingInfo = body?.shippingInfo

        // Platebni brana

        const lineItems = body?.items?.map((item:any) => {
            return {
                price_data: {
                    currency: 'czk',
                    product_data: {
                        name: item.product.name,
                        images: [item.product.imageUrl],
                    },
                    unit_amount: item.product.price * 100,
                },
                tax_rates: ['txr_1OktAyGay19qP7zDMCNjLtrW'],
                quantity: item.quantity
            }
        })

        const session = await stripe?.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `http://localhost:3000/success/orders?order_success=true`,
            cancel_url: `http://localhost:3000/cancel`,
            // customer_email: req?.user?.email,
            // client_reference_id: req?.user?._id,
            shipping_options: [
                {
                    shipping_rate: "shr_1Okt5bGay19qP7zDOD44n8on"
                }
            ],
            line_items: lineItems
        })


        // Get all admins using Prisma
        return NextResponse.json({url:session?.url}, {
            status: 200,
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: error },
            {
                status: 500,
            }
        );
    }
}