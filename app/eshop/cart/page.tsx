import {getCart} from "@app/lib/db/cart";
import CartEntry from "@app/eshop/cart/CartEntry";

export default async function CartPage() {

    const cart = await getCart();
    return (
        <div className={'m-5'}>
            <h1 className={'text-lg '}>Váš nákupní košík</h1>
            <p>Pokud není stanoveno jinak, jsou uvedené ceny včetně DPH.</p>
            {
                cart?.items.map((cartItem, index) => (
                    <CartEntry cartItem={cartItem} key={cartItem.id} />
                ))
            }
        </div>
    );
}