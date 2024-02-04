import {formattedCurrency} from "@components/utils/currencyHelper";
import {Product} from "@prisma/client";
import Link from "next/link";
import AddToCartButton from "@app/eshop/product/[id]/AddToCartButton";
import {incrementProductQuantity} from "@app/eshop/product/[id]/actions";
interface ProductCardProps {
    product: Product;
}

export default async function Card({product}: ProductCardProps) {
    const {id, description, imageUrl, name, price} = product;
    return (
        <div className={''}>
            <div key={id}  className={"card w-50 h-70 flex justify-center flex-col items-center "} style={{width:"300px"}}>
                <img src={imageUrl}
                     alt={"img"} className={"w-full rounded-lg h-60"}/>
                <div className={"w-full flex-col justify-between items-center"}>
                    <div className={"px-2 py-3 w-full"}>
                        <h3 className={"text-black"}><Link href={'/eshop/product/' + id} className={'hover:underline'} > {name}</Link></h3>
                    </div>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={"text-black p-2"}>{formattedCurrency(price)}</p>
                        <AddToCartButton productId={id} incrementProductQuantity={incrementProductQuantity} />
                    </div>
                    <div className="px-2 py-3 text-wrap text-sm">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}