import React from 'react';
import './FavouriteProducts.css';

function FavouriteProducts() {
    return (
        <section className={'section-container favourite-products-page flex-col'}>
            <h1 className={'page-title text-secondary'}>Nejoblíbenější produkty</h1>
            <div className={"cards flex flex-row gap-1 flex-wrap justify-center"}>
                <div className={"card bg-secondary w-72 h-96 rounded-lg flex justify-center flex-col items-center"}>
                    <h3 className={"text-white text-center p-4"}>Klicenky</h3>
                    <img src={"https://easykeys.com/Images/Keys_Cut/chicago/chicago_1250-1499_cut_key_large.png"}
                         alt={"img"} className={"w-3/4 "}/>
                    <button className={"btn-primary mt-3 w-40"}>Koupit</button>
                </div>
                <div className={"card bg-thirdly w-72 h-96 rounded-lg"}>
                    <h3 className={"text-white text-center p-4"}>Napisy</h3>
                </div>
                <div className={"card bg-fourthly w-72 h-96 rounded-lg"}>
                    <h3 className={"text-white text-center p-4"}>Hracky</h3>
                </div>
            </div>
            {/*<div className={""}>*/}
            {/*    dw*/}
            {/*</div>*/}
        </section>
    );
}

export default FavouriteProducts;