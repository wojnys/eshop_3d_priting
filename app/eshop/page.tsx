'use client';

import React, {useState} from 'react';
import {FaBasketShopping} from "@node_modules/react-icons/fa6";
import Data from '../../components/FavouriteProducts/FavouriteProductsData.js';
import Card from "@components/Eshop/Card/Card";


function Page() {

    const [products, setProducts] = useState(Data);

    return (
        <div>
            <div className={"h-24"}>
                <FaBasketShopping size={"30"} color={"black"} className={'top-9 absolute right-32'} style={{zIndex:"1000"}}/>
            </div>
            <div className={'flex flex-wrap gap-2 m-2 justify-center'}>
                {
                    products.map((product: {
                        id: number,
                        category: string,
                        title: string,
                        image: string,
                        price: number,
                        description: string
                    }) => (
                        <Card id={product.id} title={product.title} price={product.price} image={product.image}
                              description={product.description}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Page;