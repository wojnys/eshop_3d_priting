import {getCart} from "@app/lib/db/cart";
import CartEntry from "@app/eshop/cart/CartEntry";
import {setProductQuantity} from "@app/eshop/cart/actions";

export default async function CartPage() {

    const cart = await getCart();
    return (
        <div className={'m-5'}>
            {
                cart?.items.length === 0 ? (
                    <h1 className={"text-lg text-center"}>Váš košík je prázdný</h1>
                ) : (
                    <>
                        <h1 className={'text-lg '}>Váš nákupní košík</h1>
                        <p>Pokud není stanoveno jinak, jsou uvedené ceny včetně DPH.</p>
                        {
                            cart?.items.map((cartItem, index) => (
                                    <CartEntry cartItem={cartItem} key={cartItem.id}
                                               setProductQuantity={setProductQuantity}/>
                                )
                            )
                        }
                    </>
                )
            }
        </div>
    )
        ;
}