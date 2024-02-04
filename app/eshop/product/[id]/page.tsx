
import prisma from "@app/lib/db/prisma";
import {cache} from "react";

interface ProductPageProps {
    params: {
        id: string
    }
}

// When I am using prisma the automated data caching is not working
const getProduct = cache(async (id: string) => {
    return await prisma.product.findUnique({where: {id}}) ?? {name: 'Product not found', description: 'Product not found', price: 0};
})

export default async function Page(
    {params:{id}}: ProductPageProps
)   {
    const product = await getProduct(id);
    return (
        <section className={"section-container-no-flex"}>
            <p>DETAIL PAGE </p>
            <div className="">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>{product.price}</p>
            </div>
        </section>
    );
}