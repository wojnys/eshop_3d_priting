'use client';

import Image from "next/image";


function Home() {
    return (
        <section className={"section-container"}>
            <div className={'w-full flex items-center justify-center'}>
                <div className={"image-part w-1/2 flex flex-col justify-center"}>
                    <Image src={"/assets/main-page-image-1.jpeg"} width={300} height={300} style={{position:"relative",top:"150px",left:"100px"}} className={"p-1"} alt={"product-image"}/>
                    <Image src={"/assets/main-page-image-1.jpeg"} width={300} height={300} style={{position:"relative",top:"00px",left:"400px"}} className={"p-1 w-50"} alt={"product-image"}/>
                    <Image src={"/assets/main-page-image-1.jpeg"} width={300} height={300} style={{position:"relative",top:"-150px",left:"100px"}} className={"p-1"} alt={"product-image"}/>
                </div>
                <div className={"p-2 w-1/2 flex flex-col justify-center items-start"}>
                    <h1 className={"text-xl text-left p-2"}>
                        Vytvořte si vlastní LED barevná texty, neonové nápisy či výrobky na míru
                    </h1>
                    <button className={"btn btn-primary w-100"}>Přejít do eshopu</button>
                </div>
            </div>
        </section>
    );
}

export default Home;