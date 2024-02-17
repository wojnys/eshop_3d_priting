import {loadStripe} from '@stripe/stripe-js'

export async function checkout({lineItems}: any) {
    console.log("clicked")
    let stripePromise: any = null;

    const getStripe = async () => {
        if(!stripePromise) {
            // @ts-ignore
            stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY_STRIPE);
        }

        return stripePromise;
    }

    const stripe = await getStripe();

     await stripe.redirectToCheckout({
        mode: 'payment',
        lineItems,
        successUrl:`${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: window.location.origin
    })
}