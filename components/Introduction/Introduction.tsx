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
import {FaCube, FaKey, FaLightbulb} from "@node_modules/react-icons/fa";


function Introduction() {
    return (
        <section
            className={"section-container-no-flex items-center w-full introduction-page md:h-screen flex-col flex md:flex-row md:justify-evenly md:items-start"}>
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
                <div className={"flex justify-center mt-4 w-full flex-wrap md:justify-start"}>
                    <div
                        className={"w-32 md:w-32 h-32 text-center flex justify-center flex-col items-center bg-secondary"}>
                        <div className={'p-2'}><FaCube size={"30"} color={"white"}/></div>
                        <h4 className={"text-white"}>3D Tisk</h4>
                    </div>
                    <div
                        className={"w-32 md:w-32 h-32 text-center flex justify-center flex-col items-center bg-thirdly"}>
                        <div className={'p-2'}><FaCube size={"30"} color={"white"}/></div>
                        <h4 className={"text-white"}>LED Napisy</h4>
                    </div>
                    <div
                        className={"w-32 md:w-32 h-32 text-center flex justify-center flex-col items-center bg-fourthly"}>
                        <div className={'p-2'}><FaCube size={"30"} color={"white"}/></div>
                        <h4 className={"text-white"}>LED Napisy</h4>
                    </div>
                    <div
                        className={"w-32 md:w-32 h-32 text-center flex justify-center flex-col items-center bg-primary"}>
                        <div className={'p-2'}><FaCube size={"30"} color={"white"}/></div>
                        <h4 className={"text-white"}>LED Napisy</h4>
                    </div>
                </div>
            </div>

            <div className={"eshop-part pt-4"}>
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
                            <h3 className={"text-black"}>dwdw</h3>
                        </div>
                        <button className={"btn-primary w-40  mr-4"}>Přejít do eshopu</button>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Introduction;