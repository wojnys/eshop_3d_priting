'use client'
import InfoNavbar from "@app/eshop/cart/InfoNavbar";
import {FaCarSide, FaCcVisa, FaMoneyBill} from "@node_modules/react-icons/fa";
import {FaBuildingColumns, FaShop, FaVanShuttle} from "@node_modules/react-icons/fa6";
import Link from "next/link";
import {useState} from 'react';

export default function PaymentInfo() {
    const [paymentId, setPaymentId] = useState(1);
    const [transportId, setTransportId] = useState(1);
    return (
        <>
            <InfoNavbar/>
            <div className={"p-5"}>
                <form className={""}>
                    <h1 className={"text-lg"}>Vyberte Dopravu</h1>
                    {/*Doprava*/}
                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 flex flex-col items-start rounded">
                        <li className="flex flex-row-reverse items-center h-5 hover:bg-gray-400 p-5 w-full justify-end border-b-2">
                            <label className={"text-black p-3"}>Zasilkovna 60Kč</label>
                            <FaCarSide className={"text-red-600 ml-2"} size={"25"} color={"black"}/>
                            <input id="helper-radio-6" name="transport-type" type="radio" value="3" checked={transportId === 1} onClick={() => setTransportId(1)}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
                        </li>
                        <li className="flex flex-row-reverse items-center h-5 hover:bg-gray-400 p-5 w-full justify-end border-b-2">
                            <label className={"text-black p-3"}>PPL - 100 Kč</label>
                            <FaVanShuttle className={"text-red-600 ml-2"} size={"25"} color={"black"}/>
                            <input id="helper-radio-6" name="transport-type" type="radio" value="1" checked={transportId === 2} onClick={() => setTransportId(2)}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
                        </li>
                    </ul>

                    {/*Platba*/}

                    <h1 className={"text-lg"}>Vyberte Platbu</h1>

                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200 flex flex-col items-start rounded">
                        <li className="flex flex-row-reverse items-center h-5 hover:bg-gray-400 p-5 w-full justify-end border-b-2">
                            <label className={"text-black p-3"}>Platební Brána</label>
                            <FaCcVisa className={"text-red-600 ml-2"} size={"25"}/>
                            <input id="helper-radio-6" name="payment-type" type="radio" value="2" checked={paymentId === 1}  required={true} onClick={() => setPaymentId(1)}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
                        </li>
                        <li className="flex flex-row-reverse items-center h-5 hover:bg-gray-400 p-5 w-full justify-end border-b-2">
                            <label className={"text-black p-3"}>Osobně při převzetí - 30 KČ</label>
                            <FaMoneyBill className={"text-red-600 ml-2"} size={"25"}/>
                            <input id="helper-radio-6" name="payment-type" type="radio" value="3" checked={paymentId === 2}  onClick={() => setPaymentId(2)}
                                   className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "/>
                        </li>
                    </ul>
                </form>
                <Link className={"btn-secondary mx-2"} href={{
                    pathname: '/eshop/cart/contact-info',
                    query: {"transportId":transportId, "paymentId":paymentId},
                }}>Zpět do košíku</Link>
                <Link className={"btn-primary"} href={{
                    pathname: '/eshop/cart/contact-info',
                    query: {"transportId":transportId, "paymentId":paymentId},
                }}>Pokračovat</Link>
            </div>
        </>
    )
}