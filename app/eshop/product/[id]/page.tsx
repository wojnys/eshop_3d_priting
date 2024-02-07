import prisma from "@app/lib/db/prisma";
import {cache} from "react";
import AddToCartButton from "@app/eshop/product/[id]/AddToCartButton";
import {incrementProductQuantity} from "@app/eshop/product/[id]/actions";
import {formatPrice} from "@utils/helper";
import {getCart} from "@app/lib/db/cart";
import {getProductStockQuantity} from "@app/lib/db/stock";

interface ProductPageProps {
    params: {
        id: string
    }
}

// When I am using prisma the automated data caching is not working
const getProduct = cache(async (id: string) => {
    return await prisma.product.findUnique({where: {id}}) ?? {
        id: 'none',
        name: 'Product not found',
        description: 'Product not found',
        imageUrl: 'none',
        price: 0
    };
})

// Get product quantity from stock
const getProductQuantity = async (id: string): Promise<number | null> => {
    return await getProductStockQuantity(id)
}

export default async function Page(
    {params: {id}}: ProductPageProps
) {
    const product = await getProduct(id);
    const productStockQuantity = await getProductQuantity(id);

    return (
        <section className={"section-container-no-flex"}>
            <h1 className={"font-bold text-lg md:text-left text-left"}>{product.name}</h1>
            <div className={"flex gap-10 flex-wrap justify-start md:justify-start"}>
                <div className="image h-96 w-76">
                    <img src={product.imageUrl} alt={product.name} className={'h-full w-full'}/>
                </div>
                <div className="text-w-full md:text-w-1/2">
                    <p className={`${productStockQuantity ? "text-green-600" : "text-red-500"}`}>
                        {
                            productStockQuantity === null ? (
                                <>
                                    Není skladem
                                </>
                            ) : (
                                <>
                                    {
                                        productStockQuantity >= 10 ? `Skladem více než 10 ks` : `Skladem poslední ${productStockQuantity} kusy`
                                    }
                                </>

                            )
                        }
                    </p>
                    <p className={""}>{product.description}</p>
                    <p className={"text-[23px]"}>{formatPrice(product.price)}</p>
                    <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
                </div>
            </div>
        </section>
    );
}