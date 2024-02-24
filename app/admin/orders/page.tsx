"use client"
import {getAllOrders, updateOrderStatus} from "@app/admin/actions";
import {convertToPragueTime, formatPrice} from "@utils/helper";
import {FaCheck, FaClosedCaptioning} from "@node_modules/react-icons/fa";
import {FaXmark} from "@node_modules/react-icons/fa6";
import React, {useEffect, useState} from "react";

import {usePathname, useSearchParams} from 'next/navigation'
import Link from "next/link";
import Loading from "@components/Loading";

type Order = {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    order: {
        id: string;
        wasOrderPaid: boolean;
        wasOrderDelivered: boolean;
        createAt: Date;
        generatedOrderId: number;
        items: {
            product: {
                imageUrl: string;
                name: string;
            };
            quantity: number;
        }[];
        orderPrice: number;
    };
    transportInfo: {
        transportType: {
            name: string;
        };
        address: string;
    };
    paymentType: {
        name: string;
    };
}

export default function Page() {

    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const searchParams = useSearchParams();


    const fetchOrders = async () => {
        setLoading(true);
        try {
            const ordersData = await getAllOrders();
            // @ts-ignore
            setOrders(ordersData);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const markOrderAsFinished = async (id: string) => {
        try {
            console.log(id)
            await updateOrderStatus(id);
            const updatedValues = orders.map(order => {
                console.log(order.id)
                // If the item's id matches the specified id, update its value
                if (order.order.id === id) {
                    return {...order, order: {...order.order, wasOrderPaid: true, wasOrderDelivered: true}}; // Use object spread to update properties
                }
                return order; // Otherwise, return the item unchanged
            });
            console.log(updatedValues)
            setFilteredOrders(updatedValues);
            setOrders(updatedValues);
        } catch (error) {
            console.error('Error marking order as finished:', error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    useEffect(() => {
        const filter = searchParams.get('filter');
        if (filter === "not-finished") {
            const res = orders.filter(order => {
                return order.order && (!order.order.wasOrderPaid || !order.order.wasOrderDelivered)
                return order.order && (!order.order.wasOrderPaid || !order.order.wasOrderDelivered)
            });
            setFilteredOrders(res);
        } else if (filter === "finished") {
            const res = orders.filter(order => {
                return order.order && order.order.wasOrderPaid && order.order.wasOrderDelivered
            });
            setFilteredOrders(res);
        } else {
            setFilteredOrders(orders);
        }
    }, [orders, searchParams]);

    const findOrderNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        orders.map((order) => {
            console.log(order.order.generatedOrderId)
        })
        const filteredOrder = orders.filter(order => order.order.generatedOrderId.toString().includes((e.target.value)));
        console.log(filteredOrder)
        setFilteredOrders(filteredOrder);
    }


    return (
        <div className={"p-5"}>
            {
                loading ? <Loading/> : (
                    <>
                        <h1 className={"text-xl p-5 text-center w-full"}>Objednávky</h1>
                        <div className={"flex justify-center w-full"}>
                            <input type={"text"} placeholder={"Hledat podle čísla objednávky ..."}
                                   className={"w-3/4 m-auto p-2 border-2 border-slate-200 rounded"} onChange={(e) => {
                                findOrderNumber(e)
                            }}/>
                        </div>
                        <div className={"w-full flex justify-center flex-wrap my-5"}>
                            <Link
                                className={`${searchParams.get('filter') == "all" || searchParams.get('filter') === null ? "bg-gray-600 text-white" : "bg-gray-200 text-black"} inline-block rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2 ml-2 w-60 text-center `}
                                href={"/admin/orders?filter=all"}>
                                Všechny objednávky
                            </Link>
                            <Link
                                className={`${searchParams.get('filter') == "not-finished" ? "bg-red-600 text-white" : "bg-red-200 text-black"} inline-block rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2 ml-2 w-60 text-center`}
                                href={"/admin/orders?filter=not-finished"}>Nevyřízené
                                objednávky
                            </Link>
                            <Link
                                className={`${searchParams.get('filter') == "finished" ? "bg-green-600 text-white" : "bg-green-200 text-black"} inline-block rounded-full px-3 py-1 text-base font-semibold text-gray-700 mr-2 mb-2 ml-2 w-60 text-center`}
                                href={"/admin/orders?filter=finished"}>Dokončené
                                objednávky
                            </Link>
                        </div>

                        <div className={"flex flex-wrap gap-3"}>
                            {
                                filteredOrders.length === 0 && (
                                    <div className={"m-auto"}>
                                        <h1 className={"text-center text-lg"}>Žádné objednávky</h1>
                                    </div>
                                )
                            }
                            {
                                filteredOrders.map((order, index) => (
                                    <div className="max-w-sm rounded overflow-hidden shadow-lg w-96" key={index}>
                                        <div className="px-6 py-4">
                                            <div
                                                className="font-bold text-base mb-2">{order.firstname} {order.lastname} </div>
                                            <div className="text-gray-700 text-[18px]">
                                                <div className={"flex flex-col"}>
                                        <span
                                            className={`${order.order.wasOrderPaid ? "text-green-500" : "text-red-500"} flex items-center gap-3`}>
                                            <p>Zaplaceno</p>
                                            <div>{order.order.wasOrderPaid ? <FaCheck/> : <FaXmark/>}</div>
                                        </span>
                                        <span
                                                        className={`${order.order.wasOrderDelivered ? "text-green-500" : "text-red-500"} flex items-center gap-3`}>
                                            <p>  Doručeno / Vyzvednuto</p>
                                            <div>{order.order.wasOrderPaid ? <FaCheck/> : <FaXmark/>}</div>
                                        </span>
                                       <span>
                                            {convertToPragueTime(order.order.createAt)}
                                        </span>
                                        <span
                                            className="inline-block bg-gray-300 rounded-full p-1 text-sm font-semibold text-gray-700"> Číslo objednávky: {order.order.generatedOrderId}
                                        </span>

                                                </div>

                                                <div className={"flex flex-wrap justify-start w-full"}>
                                                    {
                                                        order.order.items.map((item, index) => (
                                                            <div className={"border-2 border-slate-200 w-full rounded"}
                                                                 key={index}>
                                                                <div>
                                                                    <img className="w-32 h-36 p-1"
                                                                         src={item.product.imageUrl}
                                                                         alt={item.product.name}/>
                                                                </div>
                                                                <div>
                                                                    {item.product.name}
                                                                </div>
                                                                <div>
                                                                    {item.quantity} ks
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 pt-4 pb-2 flex  flex-col gap-3">
                                            <div className={"border-2  border-slate-200 rounded"}>
                                                <h1 className={"p-3"}>Informace o uživateli</h1>
                                                <span
                                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ml-2">{order.email}</span>
                                                <span
                                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ml-2">{order.phone}</span>
                                            </div>

                                            <div className={"border-2  border-slate-200"}>
                                                <h1 className={"p-3"}>Informace o dopravě</h1>
                                                <span
                                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ml-2">{order.transportInfo.transportType.name}</span>
                                                <span
                                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ml-2">{order.transportInfo.address}</span>
                                            </div>

                                            <div className={"border-2  border-slate-200"}>
                                                <h1 className={"p-3"}>Informace o platbě</h1>
                                                <span
                                                    className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 ml-2">{order.paymentType.name}</span>
                                            </div>

                                            <span
                                                className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 ">{formatPrice(order.order.orderPrice)}
                                             </span>

                                            {
                                                (!order.order.wasOrderPaid || !order.order.wasOrderDelivered) && (
                                                    <button
                                                        className={"bg-green-300 hover:bg-green-500 rounded border-2 border-slate-400"}
                                                        onClick={() => markOrderAsFinished(order.order.id)}>{order.order.id} </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
}