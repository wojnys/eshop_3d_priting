
import Card from "@components/Eshop/Card/Card";
import prisma from "@/app/lib/db/prisma"
import Pagination from "@components/Eshop/Pagination";

interface HomeProps {
    searchParams: {page: string}
}

export default async function Page({searchParams: {page = "1" }}: HomeProps) {
    const currentPage = parseInt(page);

    // Number of items per page
    const pageSize = 6;

    const totalItemCount = await prisma.product.count();
    const totalPages = Math.ceil(totalItemCount / pageSize);

    const products = await prisma.product.findMany({
        orderBy: {id: 'desc'},
        skip: (currentPage - 1) * pageSize, // Hwo many items will skip and will not displayed to the user with pagination
        take: pageSize // How many items will returns
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
            {
                totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />
            }
        </div>
    );
}