import Card from "@components/Eshop/Card/Card";
import Pagination from "@components/Eshop/Pagination";
import prisma from "@/app/lib/db/prisma"
import Link from "next/link";

interface HomeProps {
    searchParams: { page: string, category: string }
}

export default async function Page({searchParams: {page = "1", category = "all"}}: HomeProps) {
    const currentPage = parseInt(page);
    // Number of items per page
    const pageSize = 6;

    const totalItemCount = await prisma.product.count();
    const totalPages = Math.ceil(totalItemCount / pageSize);

    const products = await prisma.product.findMany({
        orderBy: {id: 'desc'},
        skip: (currentPage - 1) * pageSize, // Hwo many items will skip and will not displayed to the user with pagination
        take: pageSize,// How many items will returns
        include: {
            category: true
        }
    });

    const categories = await prisma.category.findMany();

    return (
        <div>
            <div className={" flex w-full justify-center"}>
                <>
                    <Link href={`?page=${currentPage}&category=all`}
                          className={`${category === "all" ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-700"} my-4 m-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-700/10`}>Všechno</Link>
                </>
                {
                    categories.map((categoryItem) => (
                        <Link href={`?page=${currentPage}&category=${categoryItem.type}`}
                              className={`${category === categoryItem.type ? "bg-indigo-500 text-white" : "bg-indigo-50 text-indigo-700"} my-4 m-1 inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-indigo-700/10`}>{categoryItem.name}</Link>
                    ))
                }
            </div>
            <div className={'flex flex-wrap gap-2 m-2 justify-center m-auto w-9/12'}>
                {
                    products.map((product) =>
                        <>
                            {
                                (product.category.type === category || category === "all") && (
                                    <Card product={product}/>
                                )
                            }
                        </>
                    )
                }
            </div>
            {
                totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} category={category}/>
            }
        </div>
    );
}