"use server"

import {createCart, getCart} from "@app/lib/db/cart";
import prisma from "@app/lib/db/prisma";
import {revalidatePath} from "@node_modules/next/dist/server/web/spec-extension/revalidate-path";
import {getProductStockQuantity} from "@app/lib/db/stock";
import {cookies} from "@node_modules/next/dist/client/components/headers";
import {redirect} from "@node_modules/next/dist/client/components/redirect";
import {validationUserOrderScheme} from "@app/lib/types";

export async function setProductQuantity(productId: string, quantity: number) {
    const cart = await getCart() ?? await createCart();

    const itemInCart = cart.items.find(item => item.productId === productId);

    if (quantity === 0) {
        if (itemInCart) {
            await prisma.cartItem.delete({
                where: {id: itemInCart.id}
            })
        }
        revalidatePath("/eshop/cart");
    } else {
        if (itemInCart) {
            // I need to check actual quantity of products in STOCK and compare it with quantity in cart
            // I need to create new collection in db for STOCK

            const productStockQuantity = await getProductStockQuantity(productId) ?? 0;
            if (productStockQuantity >= quantity) {
                await prisma.cartItem.update({
                    where: {id: itemInCart.id},
                    data: {quantity: quantity}
                })
                revalidatePath("/eshop/cart");
            } else {
                revalidatePath("/eshop/cart");
                return {
                    success: false,
                    message: `Není skladem nebo je dostupných pouze ${productStockQuantity} kus/kusů`,
                    stockQuantityAvailable: productStockQuantity
                };
            }
        }
    }
}

export async function createOrder(formData: FormData, transportId: string | null, paymentId: string | null): Promise<{error?: string[], success?:string}> {

    const cart = await getCart();

    const firstname = formData.get("firstname")?.toString();
    const lastname = formData.get("lastname")?.toString();
    const email = formData.get("email")?.toString();
    const phone = Number(formData.get("phone") || 0);

    const address = formData.get("address")?.toString();
    const city = formData.get("city")?.toString();
    const zip = Number(formData.get("zip") || 0)

    const localCartId = cookies().get('localCartId')?.value.toString();

    // User Form data Validation
    const validationResult = validationUserOrderScheme.safeParse({firstname, lastname, email, phone, address, city, zip});
    if (!validationResult.success) {
        let errorMessages: string[] = [];
        validationResult.error.issues.forEach(issue => {
            errorMessages.push(issue.message);
        });

        return {error: errorMessages};
    }

    // Transaction to create order to mongo DB
    const result = await prisma.$transaction(async prisma => {
        try{
            // Fetch transport object
            const transportObject = await prisma.transportType.findFirst({
                where: { numberId: Number(transportId) }
            });

            // Fetch payment object
            const paymentObject = await prisma.paymentType.findFirst({
                where: { numberId: Number(paymentId) }
            });

            // Fetch cart object
            const cartObject = await prisma.cart.findFirst({
                where: { id: localCartId },
            });

            // Check if all necessary objects exist before creating the user
            if (!transportObject || !paymentObject || !cartObject || !localCartId) {
                throw new Error('Could not find necessary objects for order creation');
            }

            // Create transport info
            const transportInfo = await prisma.transportInfo.create({
                data: {
                    address: address ?? "",
                    city: city ?? "",
                    zip: zip ?? 0,
                    transportTypeId: transportObject?.id,
                },
            });

            // Create user
            const user = await prisma.user.create({
                data: {
                    firstname: firstname ?? "",
                    lastname: lastname ?? "",
                    email: email ?? "",
                    phone: phone,
                    cartId: cartObject?.id,
                    paymentTypeId: paymentObject?.id,
                    transportInfoId: transportInfo?.id
                }
            });

            // Update order
            await prisma.cart.update({
                where: { id: localCartId },
                data: { wasOrderCompleted: true, cartPrice: cart?.subtotal }
            })

            cookies().delete('localCartId');
            return {success: true, transportInfo, user};
        }catch(error){
            console.error(error);
            return {success:false}
        }
    });
    if(result?.success) {
        return {success:"Objednávka byla úspěšně vytvořena, zkontrolujte svůj email pro potvrzení objednávky. Děkujeme za nákup!"};
    } else {
        return {error: ["Bohužel nastala chyba, objednávku nelze vytvořit, obraťte se na podporu. Děkujeme za pochopení!"]};
    }
}