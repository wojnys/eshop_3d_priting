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
const getProduct = cache(async (productId: string) => {
    return await prisma.product.findUnique({
        where: {id: productId},
        include: {
            category: true
        }
    }) ?? {
        id: 'none',
        name: 'Product not found',
        description: 'Product not found',
        title: 'Product not found',
        imageUrl: 'none',
        price: 0,
        category: {
            name: 'none',
        }
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

    console.log(product);
    const productStockQuantity = await getProductQuantity(id);

    return (
        <section className={"section-container flex-col "}>
            <div className={"flex gap-10 flex-wrap justify-start md:justify-start items-center w-full md:w-3/4 "}>
                <div className="image w-64 h-72 md:h-96 md:w-80">
                    <img src={product.imageUrl} alt={product.name} className={'h-full w-full'}/>
                    <span className="inline-flex items-center rounded-full bg-slate-200 px-2 py-1 m-1 text-xs text-sm text-gray-600 ring-1 ring-inset ring-gray-500/10 ">
                             <p className={""}>{product.category.name}</p>
                    </span>
                </div>
                <div className="text-w-full md:text-w-1/2">
                    <h1 className={"font-bold text-lg md:text-left text-left"}>{product.name}</h1>
                    <p className={"text-base"}>{product.title}</p>
                    <p className={"text-[23px] pt-3"}>{formatPrice(product.price)}</p>
                    <p className={`${productStockQuantity ? "text-green-600" : "text-red-500"} `}>
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

                    <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity}/>
                </div>
                <div className={"w-full text-left flex flex-col"}>
                    <div className={"w-full"}>
                        <div className={"border-2 border-slate-700 w-1/5"}></div>
                        <div className={"border-2 border-slate-200 w-4/5"}
                             style={{position: "relative", left: "20%", top: "-4px"}}></div>
                    </div>
                    <h3 className={"mb-3 font-bold text-base"}>Popis produktu</h3>
                    <p>{product.description}</p>
                </div>
            </div>
        </section>
    );
}