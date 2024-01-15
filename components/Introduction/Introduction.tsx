import React from 'react';
import './Introduction.css';
import '@styles/swiper.css';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';


function Introduction() {
    return (
        <section className={"section-container"}>
            <div className={'introduction-container'}>
                <div className={"image-part "}>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
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
                    </Swiper>
                </div>
                <div className={"text-part p-2"}>
                    <h1 className={"text-lg text-left md:text-lg lg:text-xl"}>
                        Vytvořte si vlastní LED barevná texty, neonové nápisy, klíčenky, čí podarujte své milé originální dárečkem.
                    </h1>
                    <p className={"text-sm"}>Pro více infomrací přejděte zde</p>
                    <div>
                        <button className={"btn btn-primary w-100 mt-2 m-2"}>Přejít do eshopu</button>
                        <button className={"btn btn-secondary w-100 mt-2"}>Navrhnout vlastní</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Introduction;