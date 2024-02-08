import prisma from "@app/lib/db/prisma"

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
        });

        console.log(usersWithCarts);
        return usersWithCarts;
    } catch (error) {
        console.error('Error fetching users with carts:', error);
        throw error;
    }
}