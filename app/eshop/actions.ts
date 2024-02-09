"use server"
import prisma from "@app/lib/db/prisma";

export async function getPaginatedProducts(currentPage: number, pageSize: number){
    try{
        const products =  await prisma.product.findMany({
            orderBy: {id: 'desc'},
            skip: (currentPage - 1) * pageSize, // Hwo many items will skip and will not displayed to the user with pagination
            take: pageSize,  // How many items will returns
            include:{
                category: true
            }
        });
        return products;
    }catch(error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export async function getProductsCount() {
    try{
        return prisma.product.count();
    }catch(error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}
