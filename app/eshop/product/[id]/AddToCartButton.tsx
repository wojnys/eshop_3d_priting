'use client';
import {FaShoppingCart} from "@node_modules/react-icons/fa";
import {useState, useTransition} from "react";
import {ShoppingCart} from "@app/lib/db/cart";

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void>
}

function AddToCartButton({productId, incrementProductQuantity}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false)

    const [visibleAlert, setVisibleAlert] = useState(false);

    return (
        <div className={"flex items-center "}>

            {!isPending && success && visibleAlert &&
                <div className="bg-secondary text-white border border-white px-4 py-3 rounded fixed bottom-0 left-3 z-30 w-56" role="alert">
                    <span className="block sm:inline">Přidáno do košíku</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg className="fill-current h-6 w-6 text-blue-300" role="button" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20" onClick={() => { setVisibleAlert(false)}}><title>Close</title><path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
                </div>}

            <button className={"btn-primary w-36 mr-4 flex items-center"} onClick={() => {
                setSuccess(false);
                startTransition(async () => {
                    await incrementProductQuantity(productId)
                    setSuccess(true);
                    setVisibleAlert(true)
                })
            }}>
                {/*{!isPending && success ?  <span className={"text-green-500"}>V košíku</span> : 'Do Košíku'}*/}
                Do košíku
                <FaShoppingCart className={"ml-2"}/>
            </button>
            {isPending && <span className={"loading loading-spinner-small"}></span>}

        </div>
    );
}

export default AddToCartButton;