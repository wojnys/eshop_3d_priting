"use client";
import React, {useState} from 'react';
import './OwnUserDesgin.css'
import '@styles/swiper.css';
import Data from './OfferProductsData';

const OwnUserDesign = () => {
    const [products, setProducts] = useState(Data)

    console.log(products)
    return (
        <section className={"section-container-secondary own-design-page flex flex-col"}>
            <h1 className={"title text-white text-xl font-bold relative mb-5"}>Co nabízíme</h1>


            {/*{ products.map((product, index: number) => (*/}
            {/*    <div className={`first-product flex flex-col lg:flex ${index % 2 == 0 ? 'lg:flex-row-reversed' : 'lg:flex-row' } justify-start items-center w-full pt-5`} key={index}>*/}
            {/*        <div>*/}
            {/*            <img src={product.image}*/}
            {/*                 width={"700"} height={"500"} alt={"img"} className={"rounded-lg"}/>*/}
            {/*        </div>*/}
            {/*        <div className={"flex flex-col m-5 lg:w-96"}>*/}
            {/*            <h1 className={"text-xl relative top-2 text-white font-bold pb-3"}>{product.title}</h1>*/}
            {/*            <p className={'text-md text-white pb-3'}>{product.description}</p>*/}
            {/*            <button className={"btn-primary w-64"}>Prejit do Eshopu</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)) }*/}


            <div className="first-product flex flex-col lg:flex lg:flex-row justify-start items-center w-full pt-5">
                <div>
                    <img src={"https://img.freepik.com/premium-vector/product-text-effect-editable_214084-498.jpg"}
                         width={"700"} height={"500"} alt={"img"} className={"rounded-lg"}/>
                </div>
                <div className={"flex flex-col m-5 lg:w-96"}>
                    <h1 className={"text-xl relative top-2 text-white font-bold pb-3"}>Klicenky pro kazdeho </h1>
                    <p className={'text-md text-white pb-3'}>Moznost vlastniho navrhu klicenky, popripade si muzete
                        vybrat z naseho eshopu</p>
                    <button className={"btn-primary w-64"}>Prejit do Eshopu</button>
                </div>
            </div>

            <div
                className="first-product flex flex-col lg:flex lg:flex-row-reverse justify-start items-center w-full pt-5">
                <div>
                    <img src={"https://img.freepik.com/premium-vector/product-text-effect-editable_214084-498.jpg"}
                         width={"700"} height={"500"} alt={"img"}/>
                </div>
                <div className={"flex flex-col m-5 lg:w-96"}>
                    <h1 className={"text-xl relative top-2 text-white font-bold pb-3"}>LED texty na pohodu </h1>
                    <p className={'text-md text-white pb-3'}>Moznost vlastniho navrhu klicenky, popripade si muzete
                        vybrat z naseho eshopu</p>
                    <button className={"btn-primary w-64"}>Prejit do Eshopu</button>
                </div>
            </div>
            <div className="first-product flex flex-col lg:flex lg:flex-row justify-start items-center w-full pt-5">
                <div>
                    <img src={"https://img.freepik.com/premium-vector/product-text-effect-editable_214084-498.jpg"}
                         width={"700"} height={"500"} alt={"img"}/>
                </div>
                <div className={"flex flex-col m-5"}>
                    <h1 className={"text-xl relative top-2 text-white font-bold pb-3"}>Neony do firmy</h1>
                    <p className={'text-md text-white pb-3'}>Moznost vlastniho navrhu klicenky, popripade si muzete
                        vybrat z naseho eshopu</p>
                    <button className={"btn-primary w-64"}>Prejit do Eshopu</button>
                </div>
            </div>
        </section>
    );
}

export default OwnUserDesign;