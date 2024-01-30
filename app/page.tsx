'use client';

import Introduction from "@components/Introduction/Introduction";
import OfferProducts from "@components/Offers/OfferProducts";
import FavouriteProducts from "@components/FavouriteProducts/FavouriteProducts";
import Configurator from "@components/Configurator/Configurator";
import Navbar from "@components/Navbar/Navbar";


function Home() {
    return (
        <>
            <Navbar />
            <Introduction />
            <OfferProducts />
            <FavouriteProducts />
            <Configurator />
        </>
    );
}

export default Home;