'use client'
import {useState} from 'react'
import InfoNavbar from "@app/eshop/cart/InfoNavbar";
import Link from "next/link";
import {useSearchParams} from 'next/navigation'
import {toast} from 'react-hot-toast';
import {z} from 'zod';
import {validationUserOrderScheme} from "@app/lib/types";
import {createOrder} from "@app/eshop/cart/actions";
import MessageBox from "@app/eshop/cart/MessageBox";

export default function ContactInfo() {
    const [formMessages, setFormMessages] = useState<string[]>([]);
    const [successStatus, setSuccessStatus] = useState<boolean>(false);

    const searchParams = useSearchParams();

    const transportId = searchParams.get('transportId');
    const paymentId = searchParams.get('paymentId');
    const handleOrder = async (formData: FormData) => {

        setFormMessages([])
        setSuccessStatus(false);
        const firstname = formData.get("firstname")?.toString();
        const lastname = formData.get("lastname")?.toString();
        const email = formData.get("email")?.toString();
        const phone = Number(formData.get("phone") || 0);

        const address = formData.get("address")?.toString();
        const city = formData.get("city")?.toString();
        const zip = Number(formData.get("zip") || 0)

        const result = validationUserOrderScheme.safeParse({firstname, lastname, email, phone, address, city, zip});
        if (!result.success) {
            result.error.issues.forEach(issue => {
                setFormMessages(prevMessages => [...prevMessages, issue.message]);
            });
        } else {
            // Response from server
            const response = await createOrder(formData, transportId, paymentId);
            if (response?.error) {
                response?.error.forEach(issue => {
                    setFormMessages(prevMessages => [...prevMessages, issue]);
                });
            }
            if (response?.success) {
                setFormMessages([response?.success]);
                setSuccessStatus(true);
            }
        }
    }

    toast("Hello world!")

    return (
        <div>
            <InfoNavbar/>
            <div className={"p-5"}>

                {
                    formMessages.length > 0 && (
                        <MessageBox successStatus={successStatus} formMessages={formMessages} />
                    )
                }

                <form className="w-full max-w-lg" action={handleOrder}>
                    <h1 className={"w-full text-lg"}>Kontaktní údaje</h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label>Jméno</label>
                            <input type={"text"} className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"firstname"} required/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label>Příjmení</label>
                            <input type={"text"} className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"lastname"} required/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label>Email</label>
                            <input type={"email"} className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"email"} required/>
                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label>Tel.</label>
                            <input type={"number"} className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"phone"} required/>
                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>

                    <h1 className={"w-full text-lg"}>Kontaktní údaje</h1>

                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label>Adresa</label>
                            <input type={"text"}  className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"address"} required/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label>Obec</label>
                            <input type={"text"}  className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"city"} required/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label>PSČ</label>
                            <input type={"number"}  className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                   name={"zip"} required/>
                            <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                        </div>
                    </div>
                    <div className={"flex w-full justify-center"}>
                        <Link className={"btn-secondary  flex m-1 "} href={"/eshop/cart/payment-info"}>Zpět na Dopravu</Link>
                        <button className={"btn-primary flex m-1"} type={"submit"}>Závazně objednat</button>
                    </div>
                </form>
            </div>
        </div>
    )
}