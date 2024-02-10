import {getCart} from "@app/lib/db/cart";
import CartEntry from "@app/eshop/cart/CartEntry";
import {setProductQuantity} from "@app/eshop/cart/actions";
import {formatPrice} from "@utils/helper";
import Link from "next/link";
import InfoNavbar from "@app/eshop/cart/InfoNavbar";

export default async function CartPage() {

    const cart = await getCart();
    let priceOverall: number = 0;
    if ((cart !== null)) {
        priceOverall = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    }

    return (
        <>
            {
                cart?.items.length !== 0 || cart === null &&  <InfoNavbar/>
            }
            <div className={'p-5'}>
                {
                    cart?.items.length === 0 || undefined || cart === null ? (
                        <h1 className={"text-lg text-center"}>Váš košík je prázdný</h1>
                    ) : (
                        <>
                            <h1 className={'text-lg'}>Váš nákupní košík</h1>
                            <p className={"pb-7"}>Pokud není stanoveno jinak, jsou uvedené ceny včetně DPH.</p>
                            {
                                cart?.items.map((cartItem, index) => (
                                        <CartEntry cartItem={cartItem} key={cartItem.id}
                                                   setProductQuantity={setProductQuantity}/>
                                    )
                                )
                            }
                            <div className={"flex flex-col items-center m-4"}>
                                <h1 className={"text-[20px]"}>Celkem k úhradě: <strong
                                    className={"text-[26px]"}>{formatPrice(priceOverall)}</strong></h1>
                                <Link className={"btn-primary w-56 text-center"} href={"/eshop/cart/payment-info"}>Vytvořit
                                    objednávku</Link>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    );
}