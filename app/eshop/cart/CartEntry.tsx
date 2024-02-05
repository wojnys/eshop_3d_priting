'use client';
import {CartWithProduct} from "@app/lib/db/cart";
import Link from "next/link";
import {FaShop} from "@node_modules/react-icons/fa6";
import {FaCross, FaWindowClose} from "@node_modules/react-icons/fa";
import {formatPrice} from "@utils/helper";

interface CartEntryProps {
    cartItem: CartWithProduct
}

const quantityOptions: JSX.Element[] = [];
for (let i = 0; i <= 99; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>)
}

function CartEntry({cartItem: {product, quantity}}: CartEntryProps) {
    return (
        <div className={'flex items-center justify-between flex-wrap m-3 bg-black-200 border-2 rounded-lg text-black'}>
            <div className={''}>
                <img src={product.imageUrl} alt={product.name} width={100} className={"rounded-lg h-28 w-24"}/>
            </div>
            <div>
                <Link href={'/eshop/product/' + product.id} className={'hover:underline'}> {product.name}</Link>
            </div>
            <div>
                Cena: {formatPrice(product.price)}
            </div>
            <div className={'my-1 flex items-center gap-1'}>
                Quantity:
                <select className={"bg-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80px] p-2.5 text-black"}
                defaultValue={quantity}
                onChange={e => {

                }}>
                    {quantityOptions}
                </select>
            </div>
            <div className={'font-bold'}>
                Celkem: {formatPrice(product.price * quantity)}
            </div>
            <div>
                <FaWindowClose className={"text-2xl"} color={"black"} size={"25"} onClick={e => console.log('was removed', e)}/>
            </div>
            <hr></hr>
        </div>
    );
}

export default CartEntry;