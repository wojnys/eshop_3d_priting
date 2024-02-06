import prisma from "@app/lib/db/prisma";

export async function getProductStockQuantity(productId: string): Promise<number | null> {
    const stock = await prisma.stock.findFirst({
        where: {productId:  productId}
    });
    return stock?.quantity ?? null;
}