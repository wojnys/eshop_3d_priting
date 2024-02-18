'use client'
import {useEffect, useState} from 'react'
import InfoNavbar from "@app/eshop/cart/InfoNavbar";
import Link from "next/link";
import {useSearchParams} from 'next/navigation'
import {useRouter} from 'next/navigation'
import {validationUserOrderScheme} from "@app/lib/types";
import {createOrder} from "@app/eshop/cart/actions";
import {getCart, ShoppingCart} from "@app/lib/db/cart";
import {PaymentType, TransportType} from "@prisma/client";
import {getPaymentTypeByNumber, getTransportTypeByNumber} from "@app/lib/db/general";
import {formatPrice} from "@utils/helper";
import {FaMoneyBill, FaTruck} from "@node_modules/react-icons/fa";
import Loading from "@components/Loading";
import {checkout} from "@checkout";
import SweetAlertMessageBox from "@components/Alerts/SweetAlertMessageBox";
import axios from "@node_modules/axios";

export default function ContactInfo() {
    const router = useRouter()

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
                // GATEWAY
                try{
                    const { data } = await axios.post('/api/orders', {
                        items: cartRecap?.items,
                        shippingInfo: transportRecap,
                        userInfo: {firstname, lastname, email, phone, address, city, zip},
                        paymentId: paymentId,
                        transportId: transportId
                    })
                    // console.log('jus data', data);
                    window.location.href = data.url
                }catch(error){
                    throw error;
                }

                setFormMessages([response?.success]);
                setSuccessStatus(true);
            }
        }
    }

    const [cartRecap, setCartRecap] = useState<ShoppingCart>();
    const [paymentRecap, setPaymentRecap] = useState<PaymentType>();
    const [transportRecap, setTransportRecap] = useState<TransportType>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                const cart = await getCart();
                const transport = await getTransportTypeByNumber(Number(transportId));
                const payment = await getPaymentTypeByNumber(Number(paymentId));

                if (cart !== null)
                    setCartRecap(cart)
                if (transport !== null)
                    setTransportRecap(transport)
                if (payment !== null)
                    setPaymentRecap(payment)

            } catch (error) {
                throw error;
            } finally {
                setLoading(false)
            }
        }
        fetchCart();
    }, []);

    console.log(paymentRecap)

    return (
        <div>
            <InfoNavbar/>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <div className={"p-5 flex flex-wrap flex-col"}>
                        {
                            formMessages.length > 0 && (
                                <SweetAlertMessageBox successStatus={successStatus} messages={formMessages}/>
                            )
                        }

                        <form className="" action={handleOrder}>
                            <div className={"flex flex-wrap"}>
                                <div className={"max-w-lg sm:mr-[50px]"}>
                                    <h1 className={"w-full text-lg"}>Kontaktní údaje</h1>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label>Jméno</label>
                                            <input type={"text"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"firstname"} required/>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label>Příjmení</label>
                                            <input type={"text"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"lastname"} required/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label>Email</label>
                                            <input type={"email"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"email"} required/>
                                            <p className="text-gray-600 text-xs italic">Na tento email vám přijde
                                                potvrzení
                                                objednávky</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label>Tel.</label>
                                            <input type={"number"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"phone"} required/>
                                        </div>
                                    </div>
                                    <h1 className={"w-full text-lg"}>Údaje pro Dopravce</h1>

                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                            <label>Adresa</label>
                                            <input type={"text"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"address"} required/>
                                        </div>
                                        <div className="w-full md:w-1/2 px-3">
                                            <label>Obec</label>
                                            <input type={"text"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"city"} required/>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap -mx-3 mb-6">
                                        <div className="w-full px-3">
                                            <label>PSČ</label>
                                            <input type={"number"}
                                                   className={"appearance-none block w-full bg-slate-100 text-gray-700 border border-slate-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"}
                                                   name={"zip"} required/>
                                            <p className="text-gray-600 text-xs italic">Na tuto adresu doručíme
                                                požadované
                                                zboží</p>
                                        </div>
                                    </div>

                                </div>


                                <div className={"flex justify-end w-full sm:w-[350px] "}>
                                    <div className={"flex flex-col w-full"}>
                                        {
                                            cartRecap?.items.map((item, index) => (
                                                <div className={"border border-slate-300 flex rounded items-center"}
                                                     key={index}>
                                                    <div className={"p-2"}>
                                                        <img src={item.product.imageUrl} alt={item.product.name}
                                                             width={50}
                                                             height={50}/>
                                                    </div>
                                                    <div className={"flex flex-col p-2"}>
                                                        <div className={"flex"}>
                                                            <Link href={`/eshop/product/${item.product.id}`}
                                                                  className={"hover:underline"}>
                                                                <p className={"pr-2"}>{item.quantity}x</p>
                                                                <p>{item.product.title}</p>
                                                                {item.product.name}
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <p className={"text-bold"}>{formatPrice(item.product.price * item.quantity)}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className={"border border-slate-300 rounded p-2 flex flex-col"}>
                                            <h1 className={"text-base"}>Doprava</h1>
                                            <div className={"flex justify-between"}>
                                                <div className={"flex items-center gap-1"}><FaTruck size={20}
                                                                                                    color={"black"}/>
                                                    <p>{transportRecap?.name} </p></div>
                                                <p>{formatPrice(Number(transportRecap?.price))}</p>
                                            </div>
                                        </div>
                                        <div className={"border border-slate-300 flex rounded p-2 flex flex-col"}>
                                            <h1 className={"text-base"}>Platba</h1>
                                            <div className={"flex justify-between"}>
                                                <div className={"flex items-center gap-1"}><FaMoneyBill size={20}
                                                                                                        color={"black"}/>
                                                    <p>{paymentRecap?.name} </p></div>
                                                <p>{formatPrice(Number(paymentRecap?.price))}</p>
                                            </div>
                                        </div>
                                        <div className={"border border-slate-300 rounded p-2 flex justify-between"}>
                                            <h1 className={"text-base"}>Celkem</h1>
                                            <h1 className={"text-base font-[2100]"}>{formatPrice(Number(cartRecap?.subtotal) + Number(paymentRecap?.price) + Number(transportRecap?.price))} </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className={"flex w-full justify-start"}>
                                <Link className={"btn-secondary  flex m-1 "} href={"/eshop/cart"}>Zpět do Košíku</Link>
                                <button className={"btn-primary flex m-1"} type={"submit"}>Závazně objednat
                                </button>
                            </div>
                        </form>


                        {/*<button className={"btn-primary flex m-1"} type={"submit"}*/}
                        {/*        onClick={() => {*/}
                        {/*            checkout({*/}
                        {/*                lineItems: [*/}
                        {/*                    {*/}
                        {/*                        price: 'price_1Ok0iOGay19qP7zDlF6WsTtP',*/}
                        {/*                        quantity: 2,*/}
                        {/*                    },*/}
                        {/*                    {*/}
                        {/*                        price: 'price_1Ok2T7Gay19qP7zDMfX96YAC',*/}
                        {/*                        quantity: 2,*/}
                        {/*                    }*/}
                        {/*                ]*/}
                        {/*            })*/}
                        {/*        }}>Platebni brana*/}
                        {/*</button>*/}

                    </div>
                )
            }
        </div>
    )
}