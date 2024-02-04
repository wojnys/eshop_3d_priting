// import {ShoppingCart} from "@app/lib/db/cart";
// import {FaShoppingCart} from "@node_modules/react-icons/fa";
// import DropdownMenu from "@app/eshop/product/Navbar/DropDown";
//
// interface ShoppingCartButtonProps {
//     cart: ShoppingCart | null;
//
// }
//
// function ShoppingCartButton({cart}: ShoppingCartButtonProps) {
//     return (
//         <div className={"dropdown dropdown-end"}>
//             <label tabIndex={0} className={"btn btn-ghost btn-circle btn"}>
//                 <div className={"indicator flex flex-row"}>
//                     <div className={""}>
//                         <FaShoppingCart className={"text-2xl"} color={"white"} size={"25"}/>
//                     </div>
//                     <span className={'relative bottom-2 rounded-full bg-red-300 w-5 h-5 text-center'}
//                           style={{fontSize: "12px", lineHeight: "21px"}}> {cart?.size ?? 0} </span>
//                 </div>
//             </label>
//
//             <DropdownMenu />
//
//         </div>
//     );
// }
//
// export default ShoppingCartButton;


'use client';
import {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import {ShoppingCart} from "@app/lib/db/cart";
import {FaShoppingCart} from "@node_modules/react-icons/fa";
import Link from "next/link";

interface ShoppingCartButtonProps {
    cart: ShoppingCart | null;

}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

export default function ShoppingCartButton({cart}: ShoppingCartButtonProps) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button>
                    <div className={"indicator flex flex-row "}>
                        <div className={""}>
                            <FaShoppingCart className={"text-2xl"} color={"white"} size={"25"}/>
                        </div>
                        <span className={'relative bottom-2 rounded-full bg-red-300 w-5 h-5 text-center'}
                              style={{fontSize: "12px", lineHeight: "21px"}}> {cart?.size ?? 0} </span>
                    </div>
                </Menu.Button>
            </div>

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
                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <h1 className={"text-center"}>{ `${cart?.size} Položek/ky` ?? 'Žádné položky'}</h1>
                        <p>{cart?.subtotal}</p>
                        <Menu.Item>
                            {({active}) => (
                                <a
                                    href="#"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                    )}
                                >
                                    Account settings
                                </a>
                            )}
                        </Menu.Item>
                        <button className={"btn-primary w-32"}><Link href={'/'}>Zobrazit </Link></button>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}


