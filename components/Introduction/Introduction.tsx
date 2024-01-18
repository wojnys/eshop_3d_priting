'use client';
import React, {useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';
import './Introduction.css';
import '@styles/swiper.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';


// import required modules
import {EffectCards} from 'swiper/modules';
import {FaBolt, FaChild, FaCube, FaKey, FaLightbulb} from "@node_modules/react-icons/fa";
import {FaK} from "@node_modules/react-icons/fa6";


function Introduction() {
    return (
        <section
            className={"section-container-no-flex items-center justify-center w-full introduction-page lg:h-screen flex-col flex lg:flex-row lg:justify-evenly lg:items-start"}>
            <div className={"text-part flex flex-col flex-wrap"}>
                <div className={"md:w-3/4"}>
                    <h1 className={"text-blg md:text-lg lg:text-xl"}>
                        Tvoř vlastní 3D
                    </h1>
                    <p className={"text-sm md:text-base" }>Hledas originalni darek pro sve blizke nebo si majitel firmy a chcews svym zamestancum udelat radost ? </p>
                </div>
                <div className={"flex flex-row"}>
                    <button className={"btn btn-secondary w-100 "}>Vlastní návrh</button>
                </div>
                <div className={"flex justify-center mt-4 w-full flex-wrap lg:justify-start"}>
                    <div
                        className={"w-1/2 sm:w-1/3 sm:h-64 text-center flex justify-center flex-col items-center bg-secondary p-2"}>
                        <div className={'p-2'}><FaKey size={"30"} color={"white"}/></div>
                        <h4 className={"text-white font-bold sm:text-base"}>Klíčenky</h4>
                        <p className={"text-white text-sm/[15px]"}>Tvorba klíčenek z platu či kovu</p>
                    </div>
                    <div
                        className={"w-1/2 sm:w-1/2 sm:h-64 text-center flex justify-center flex-col items-center bg-thirdly p-2"}>
                        <div className={'p-2'}><FaCube size={"30"} color={"white"}/></div>
                        <h4 className={"text-white font-bold sm:text-base"}>3D TISK</h4>
                        <p className={"text-white text-sm/[15px]"}>3D Tisk pro kohokoliv</p>
                    </div>
                    <div
                        className={"w-1/2 sm:w-1/2 sm:h-64 text-center flex justify-center flex-col items-center bg-fourthly p-2"}>
                        <div className={'p-2'}><FaBolt size={"30"} color={"white"}/></div>
                        <h4 className={"text-white font-bold text-sm sm:text-base"}>LED/Neonové nápisy</h4>
                        <p className={"text-white text-sm/[15px]"}>Osvětlete si svůj pokoj nebo dům</p>
                    </div>
                    <div
                        className={"w-1/2 sm:w-1/3 sm:h-64 text-center flex justify-center flex-col items-center bg-primary p-2"}>
                        <div className={'p-2'}><FaChild size={"30"} color={"white"}/></div>
                        <h4 className={"text-white sm:text-base font-bold"}>Hračky pro děti</h4>
                        <p className={"text-white text-sm/[15px]"}>Uděletje radost vašemu děťátku </p>
                    </div>
                </div>
            </div>

            <div className={"eshop-part pt-4 flex items-center h-full"}>
                <div className={"card flex justify-center flex-col items-center"}><Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
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
                    <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                    </div>
                </Swiper>
                    <div className={"w-full flex justify-between items-center"}>
                        <div className={"flex flex-col p-4"}>
                            <h3 className={"text-black"}>Úkazkové produkty</h3>
                        </div>
                        <button className={"text-sm sm:text-sm/[30px] btn-primary w-40 mr-4"}>Přejít do eshopu</button>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Introduction;