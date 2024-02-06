'use client';
import {FaShoppingCart} from "@node_modules/react-icons/fa";
import {useState, useTransition} from "react";
import AlertMessage from "@components/Alerts/MessageAlert"

interface AddToCartButtonProps {
    productId: string,
    incrementProductQuantity: (productId: string) => Promise<{ success: boolean, message: string }>
}

function AddToCartButton({productId, incrementProductQuantity}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false)
    const [notInStock, setNotInStock] = useState(false)

    const [visibleAlert, setVisibleAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');

    return (
        <div className={"flex items-center "}>
            {!isPending && visibleAlert && success && ( <AlertMessage message={messageAlert} successMessage={true}
                              setVisibleAlert={setVisibleAlert}/>
            )}
            {!isPending && visibleAlert && notInStock && ( <AlertMessage message={messageAlert} successMessage={false}
                                                                      setVisibleAlert={setVisibleAlert}/>
            )}

            <button className={"btn-primary w-36 mr-4 flex items-center"} onClick={() => {
                try {
                    setSuccess(false);
                    setNotInStock(false);
                    startTransition(async () => {
                        const res = await incrementProductQuantity(productId)
                        if (res.success) {
                            setSuccess(true);
                        } else {
                            setNotInStock(true);
                        }
                        console.log(res)
                        setVisibleAlert(true)
                        setMessageAlert(res.message)
                    })
                } catch {
                    console.log('error')
                }
            }}>
                Do košíku
                <FaShoppingCart className={"ml-2"}/>
            </button>
            {isPending && <span className={"loading loading-spinner-small"}></span>}

        </div>
    );
}

export default AddToCartButton;