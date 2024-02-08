"use server";
import prisma from "@app/lib/db/prisma"
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";

export async function getAllOrders() {
    try {
        const usersWithCarts = await prisma.user.findMany({
            include: {
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true,
                            },
                        },
                    },
                },
                paymentType: true, // Include if you also want to include payment information
                transportInfo: {
                    include: {
                        transportType: true,
                    },
                }, // Include if you also want to include transport information
            },
            orderBy: {
                createAt: 'desc',
            }
        });

        return usersWithCarts;
    } catch (error) {
        console.error('Error fetching users with carts:', error);
        throw error;
    }
}

export async function updateOrderStatus(cartId: string) {
    try{
        await prisma.cart.update({
            where: { id: cartId },
            data: { wasOrderPaid: true, wasOrderDelivered: true }
        })
        revalidatePath("/admin/orders")
    }catch(error) {
        console.error('Error updating order status:', error);
        throw error;
    }
}
