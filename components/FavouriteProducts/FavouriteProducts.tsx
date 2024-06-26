'use client';
import React, {useState} from 'react';
import './FavouriteProducts.css';
import Data from './FavouriteProductsData.js';
import {formattedCurrency} from '../utils/currencyHelper';
import {useRouter} from "@node_modules/next/dist/client/components/navigation";

function FavouriteProducts() {
    const router = useRouter();
    const [favouriteProducts, setFavouriteProducts] = useState(Data);

    const showDetail = (id:number) => {
        console.log(id);
        router.push(`/eshop/product/${id}/detail/`);
    }
    return (
        <section className={'section-container favourite-products-page flex-col'}>
            <h1 className={'page-title text-secondary'}>Nejoblíbenější produkty</h1>
            <div className={"cards flex flex-row gap-2 flex-wrap justify-center"}>
            {
                favouriteProducts.map((product, index) => {
                    const {id, title, price, image} = product;
                    return (
                        <div key={index}  className={"card w-80 flex justify-center flex-col items-center"}>
                            <img src={image}
                                 alt={"img"} className={"w-full rounded-lg "}/>
                            <div className={"w-full flex justify-between items-center"}>
                                <div className={"flex flex-col p-4"}>
                                    <h3 className={"text-black"}>{title}</h3>
                                    <p className={"text-black"}>{formattedCurrency(price)}</p>
                                </div>
                                <button className={"btn-primary w-40 mr-4"} onClick={() => showDetail(id)}>Koupit</button>
                            </div>
                        </div>
                    );
                })
            }
            </div>
        </section>
    );
}

export default FavouriteProducts;