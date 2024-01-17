'use client';

import Image from "next/image";
import Introduction from "@components/Introduction/Introduction";
import OfferProducts from "@components/Offers/OfferProducts";
import FavouriteProducts from "@components/FavouriteProducts/FavouriteProducts";


function Home() {
    return (
        <>
            <Introduction />
            <OfferProducts />
            <FavouriteProducts />
        </>
    );
}

export default Home;