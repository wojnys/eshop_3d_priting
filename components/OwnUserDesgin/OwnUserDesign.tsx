import React from 'react';
import './OwnUserDesgin.css'
import '@styles/swiper.css';
import {FaCheck} from "react-icons/fa";

function OwnUserDesign() {
    return (
        <section className={"section-container own-design-page"}>
            <div className={"top-part"}>
                <img src={"https://vastpFaBarshotos.com/files/uploads/photos/11060/very-high-resolution-forest-photo-m.jpg?v=20220712073521"} className={'top-image'} alt={""}/>
                <div className="information-card">
                    <div className={'text-lg pl-5 pt-3 italic font-bold'}>
                        Vytvorte si produkt dle vlastni fantazie
                    </div>
                    <div className={"pt-5 pl-5"}>
                        <ul>
                            <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>LED NAPISY</li>
                            <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>KLicenky</li>
                            <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>Neon NAPISY</li>
                            <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>Hracky</li>
                        </ul>
                    </div>
                    <button className={'btn-primary w-48 ml-5 mt-5'}>ANo mam zajem</button>
                </div>
            </div>
            <div className="products">
                products
            </div>
        </section>
    );
}

export default OwnUserDesign;