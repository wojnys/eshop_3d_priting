import Card from "@components/Eshop/Card/Card";

interface SearchPageProps {
    searchParams: {query: string}
}

export default async function SearchPage({searchParams:{query}}:SearchPageProps) {
    const products = await prisma?.product.findMany({
        where: {
            OR : [
                {name: {contains: query, mode:"insensitive"}},
                {description: {contains: query, mode:"insensitive"}},
            ]
        },
        orderBy: {id: 'desc'},
    });

    if(products?.length === 0) {
        return <div className={"text-center"}>Tento produkt neexistuje</div>
    }
    return (
        <div className={"flex flex-wrap gap-2 m-2 justify-center"}>
            {
                products?.map((product) =>
                    <Card product={product}/>
                )
            }
        </div>
    );

}