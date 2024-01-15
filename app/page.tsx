'use client';

import Image from "next/image";
import Introduction from "@components/Introduction/Introduction";
import OwnUserDesign from "@components/OwnUserDesgin/OwnUserDesign";


function Home() {
    return (
        <>
            <Introduction />
            <OwnUserDesign />
        </>
    );
}

export default Home;