"use client";
import React, {useState} from 'react';
import './OfferProducts.css'
import '@styles/swiper.css';
import Data from './OfferProductsData';

const OfferProducts = () => {
    const [products, setProducts] = useState(Data)

    console.log(products)
    return (
        <section className={"section-container-secondary own-design-page flex flex-col"}>
            <h1 className={"page-title"}>Co nabízíme</h1>

            { products.map((product, index: number) => (
                <div className={`first-product flex flex-col lg:flex ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row' } justify-start items-center w-full pt-5`} key={index}>
                    <div>
                        <img src={product.image}
                             width={"600"} height={"500"} alt={"img"} className={"rounded-lg"}/>
                    </div>
                    <div className={"flex flex-col m-5 lg:w-96"}>
                        <h1 className={"text-blg relative top-2 text-white font-bold pb-3"}>{product.title}</h1>
                        <p className={'text-md text-white pb-3'}>{product.description}</p>
                        <button className={"btn-primary w-64"}>Prejit do Eshopu</button>
                    </div>
                </div>
            )) }
        </section>
    );
}

export default OfferProducts;