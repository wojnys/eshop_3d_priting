'use client';
import React from 'react';
import './Introduction.css';
import '@styles/swiper.css';
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import {EffectCards} from 'swiper/modules';
import {FaCheck, FaCube, FaKey, FaKeybase, FaLightbulb} from "@node_modules/react-icons/fa";


function Introduction() {
    return (
        <section className={"section-container introduction-page flex-col h-screen"}>
            <div className={"flex justify-center mt-4 w-full flex-wrap"}>
                <div className={"w-32 md:-w52 h-20 text-center flex justify-center flex-col items-center"}>
                    <div className={'p-2'}><FaCube size={"30"}/></div>
                    <h4>3D TISK</h4>
                </div>
                <div className={"w-32 md:w-52 h-20 text-center flex justify-center flex-col items-center"}>
                    <div className={'p-2'}><FaKey size={"30"}/></div>
                    <h4>Klicenky</h4>
                </div>
                <div className={"w-32 md:w-52 h-20 text-center flex justify-center flex-col items-center"}>
                    <div className={'p-2'}><FaLightbulb size={"30"}/></div>
                    <h4>LED/Neonove Napisy</h4>
                </div>
            </div>
            <div className={'introduction-container mt-4 flex justify-center w-full'}>
                <div className={"text-part p-2"}>
                    <h1 className={"text-blg text-left md:text-lg lg:text-xl"}>
                        Navrhnete si svuj vlastni produkt ve 3D a budte IN
                    </h1>
                    <ul className={"pl-5"}>
                        <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>Klicenky - moznost
                            vlastniho ci predem predpripraveneho deisgnu
                        </li>
                        <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>LED/Neonove barevene
                            napisy na stenu ci do vase pokojiku
                        </li>
                        <li className={'flex flex-row items-center'}><FaCheck className={"mr-2"}/>Hrcaky pro vase
                            detatka ci moznost vytisknuti vlastnich modlu
                        </li>
                    </ul>
                    <div>
                        <button className={"btn btn-primary w-100 mt-2 m-2"}>Eshop</button>
                        <button className={"btn btn-secondary w-100 mt-2"}>Vlastní návrh</button>
                    </div>
                </div>
                <div className={"image-part"}>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        className="mySwiper"
                        initialSlide={4}
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default Introduction;