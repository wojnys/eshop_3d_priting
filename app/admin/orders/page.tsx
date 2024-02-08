import React from 'react';
import {getAllOrders} from "@app/admin/actions";
import {formatPrice} from "@utils/helper";


export default async function Page() {

    const orders = await getAllOrders();

    return (
        <div>
            <h1>Objednavky</h1>
            <div className={"flex flex-wrap gap-3"}>
                {
                    orders.map((order, index) => (
                        <div className="max-w-sm rounded overflow-hidden shadow-lg" key={index}>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{order.firstname} {order.lastname} </div>
                                <div className="text-gray-700 text-[18px]">
                                    <div>
                                        {
                                            order.cart.items.map((item, index) => (
                                                <div key={index}>
                                                    <div>
                                                        <img className="w-1/2 h-1/2"
                                                             src={"https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707350400&semt=sph"}
                                                             alt="Sunset in the mountains"/>
                                                    </div>
                                                    <div>
                                                        {item.product.name}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 pt-4 pb-2 flex  flex-col gap-3">
                                <div className={"border-2  border-slate-200"}>
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
                                    className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400 ">{formatPrice(order.cart.cartPrice)}
                                </span>

                                <span></span>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
}
