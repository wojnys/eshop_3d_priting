import {FaBasketShopping} from "@node_modules/react-icons/fa6";
import Card from "@components/Eshop/Card/Card";
import prisma from "@/app/lib/db/prisma"
import EshopNavbar from "@app/eshop/product/Navbar/EshopNavbar";


export default async function Page() {
    const products = await prisma.product.findMany({
        orderBy: {id: 'desc'}
    });
    return (
        <div>
            <div className={'flex flex-wrap gap-2 m-2 justify-center'}>
                {
                    products.map((product) =>
                        <Card product={product}/>
                    )
                }
            </div>
        </div>
    );
}