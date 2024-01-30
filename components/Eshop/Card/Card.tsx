import React from 'react';
import {formattedCurrency} from "@components/utils/currencyHelper";
// Define a TypeScript interface for the props
interface CardProps {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
}

function Card({id, title, price, image, description}: CardProps) {
    return (
        <div className={''}>
            <div key={id}  className={"card w-50 h-70 flex justify-center flex-col items-center "} style={{width:"300px"}}>
                <img src={image}
                     alt={"img"} className={"w-full rounded-lg h-60"}/>
                <div className={"w-full flex-col justify-between items-center"}>
                    <div className={"px-2 py-3 w-full"}>
                        <h3 className={"text-black"}>{title}</h3>
                    </div>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={"text-black p-2"}>{formattedCurrency(price)}</p>
                        <button className={"btn-primary w-36 mr-4"}>Do košíku</button>
                    </div>
                    <div className="px-2 py-3 text-wrap text-sm">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;