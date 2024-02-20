'use client';
import {Fragment, useState} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ShoppingCart} from "@app/lib/db/cart";
import {FaShoppingCart} from "@node_modules/react-icons/fa";
import Link from "next/link";
import {formatPrice} from "@utils/helper";

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function ShoppingCartButton({cart}: ShoppingCartButtonProps) {
    console.log(cart)
    const [visible, setVisible] = useState(false)
    return (
        <> <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    <div className={"indicator flex flex-row hover:text-black text-white"}>
                        <div className={""} onClick={() => {
                            setVisible(true)
                        }}>
                            <FaShoppingCart className={"text-2xl"} color={""} size={"25"}/>
                        </div>
                        <span className={'relative bottom-2 rounded-full bg-red-300 w-5 h-5 text-center'}
                              style={{fontSize: "12px", lineHeight: "21px"}}> {cart?.size ?? 0} </span>
                    </div>
                </Menu.Button>
            </div>

            {
                visible &&
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {
                            cart?.size === 0 || cart === null ? (
                                <>
                                    <p className={"m-3 p-3"}>Váš košík je prázdný</p>
                                </>
                            ) : (
                                <div className="py-1 px-2 flex flex-col">
                                    <h1 className={"text-center"}>{`${cart?.size} Položek/ky` ?? 'Žádné položky'}</h1>
                                    {
                                        cart?.items.map((item, index) => (
                                            <Menu.Item key={item.product.id}>
                                                {({active}) => (
                                                    <a
                                                        href={`/eshop/product/${item.product.id}`}
                                                        className={classNames(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        <div className={"flex items-center gap-2 my-2"}>
                                                            <div className={"w-10 h-10"}>
                                                                <img src={item.product.imageUrl} alt={"image"}
                                                                     className={"h-full w-full"}/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <h1>{item.product.name}</h1>
                                                                </div>
                                                                <div className={"flex"}>
                                                                    <p>{formatPrice(item.product.price * item.quantity)}</p>
                                                                    <p className={"px-2"}> / </p>
                                                                    <p>{item.quantity}ks</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        ))
                                    }
                                    <p className={"text-center"}>Celkem {formatPrice(cart?.subtotal ?? 0)}</p>
                                    <button className={"btn-primary w-32 m-auto"}><Link
                                        href={'/eshop/cart'} onClick={() => setVisible(false)}>Zobrazit</Link>
                                    </button>
                                </div>
                            )
                        }
                    </Menu.Items>
                </Transition>
            }
        </Menu>
        </>
    )
        ;
}


