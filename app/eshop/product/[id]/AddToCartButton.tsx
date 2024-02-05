'use client';

import {FaShoppingCart} from "@node_modules/react-icons/fa";
import {useState, useTransition} from "react";

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<void>
}

function AddToCartButton({productId, incrementProductQuantity}: AddToCartButtonProps) {

    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false)

    return (
        <div className={"flex items-center gap-2"}>
            <button className={"btn-primary w-36 mr-4 flex items-center"} onClick={() => {
                setSuccess(false);
                startTransition(async () => {
                    await incrementProductQuantity(productId)
                    setSuccess(true);
                })
            }}>
                {!isPending && success ?  <span className={"text-green-500"}>V košíku</span> : 'Do Košíku'}
                <FaShoppingCart className={"ml-2"}/>
            </button>
            {isPending && <span className={"loading loading-spinner-small"}></span>}
        </div>
    );
}

export default AddToCartButton;