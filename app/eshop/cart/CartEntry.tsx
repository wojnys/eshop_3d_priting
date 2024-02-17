'use client';
import {CartWithProduct} from "@app/lib/db/cart";
import Link from "next/link";
import {FaWindowClose} from "@node_modules/react-icons/fa";
import {formatPrice} from "@utils/helper";
import {useState, useTransition} from "react";
import MessageAlert from "@components/Alerts/MessageAlert";

interface CartEntryProps {
    cartItem: CartWithProduct,
    setProductQuantity: (productId: string, quantity: number) => Promise<{
        success: boolean,
        message: string,
        stockQuantityAvailable: number
    } | undefined>
}

const quantityOptions: JSX.Element[] = [];
for (let i = 0; i <= 10; i++) {
    quantityOptions.push(<option key={i} value={i}>{i}</option>)
}

function CartEntry({cartItem: {product, quantity}, setProductQuantity}: CartEntryProps) {
    // is necessary to use useTransition hook in client when calling server action to avoid blocking the main thread
    const [isPending, startTransition] = useTransition();
    const [notInStock, setNotInStock] = useState(false);
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const [currentProductQuantity, setCurrentProductQuantity] = useState(quantity);
    return (
        <div
            className={'flex flex-col md:flex-row items-center justify-between flex-wrap m-3 bg-black-200 border-2 rounded-lg text-black'}>
            {
                alertVisibility && notInStock && (
                    <MessageAlert message={alertMessage} successMessage={false} setVisibleAlert={setAlertVisibility}/>
                )
            }

            <div className={"flex flex-row items-center text-left border-b-2 md:border-none p-2 gap-4"}>
                <div className={''}>
                    <img src={product.imageUrl} alt={product.name} width={100} className={"rounded-lg h-28 w-24"}/>
                </div>
                <div className={"w-52"}>
                    <Link href={'/eshop/product/' + product.id} className={'hover:underline'}> {product.name}</Link>
                </div>
            </div>
            <div className={"flex items-center gap-4 p-2 w-72 justify-between"}>
                <div>
                    Cena: {formatPrice(product.price)}
                </div>
                <div className={'my-1 flex items-center gap-1'}>
                    Quantity:
                    <select
                        className={"bg-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80px] p-2.5 text-black"}
                        value={currentProductQuantity}
                        onChange={e => {
                            setNotInStock(false)
                            setAlertVisibility(false)
                            setCurrentProductQuantity(parseInt(e.target.value));
                            startTransition(async () => {
                                const res = await setProductQuantity(product.id, parseInt(e.target.value))
                                if (res?.success === false) {
                                    setNotInStock(true);
                                    setAlertVisibility(true);
                                    setAlertMessage(res?.message);
                                    setCurrentProductQuantity(res?.stockQuantityAvailable);
                                }
                            })
                        }}>
                        {quantityOptions}
                    </select>
                </div>
            </div>

            <div className={'flex items-center gap-4 justify-between w-52 p-2'}>
                <div className={'font-bold'}>
                    Celkem: {formatPrice(product.price * currentProductQuantity)}
                </div>
                <div>
                    <FaWindowClose className={"text-2xl cursor-pointer"} color={"black"} size={"25"} onClick={e => {
                        startTransition(async () => {
                            await setProductQuantity(product.id, 0);
                            console.log('removed product from cart')
                        })
                    }}/>
                </div>
            </div>
            <hr></hr>
        </div>
    );
}

export default CartEntry;