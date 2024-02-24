import {z} from "@node_modules/zod";

export const validationUserOrderScheme = z.object({
    firstname: z.string().min(1, {message: "Jméno je povinné",}).max(50, {message: "Jméno je příliš dlouhé"}),
    lastname: z.string().min(1, {message: "Příjmení je povinné",}).max(50, {message: "Příjmení je příliš dlouhé"}),
    email: z.string().min(1, {message: "Email je povinný",}).max(50, {message: "Email je příliš dlouhý"}).email({message: "Zadejte platný email"}),
    phone: z.number().min(1, {message: "Tel. číslo je povinné",}),
    address: z.string().min(1, {message: "Adresa je povinná",}).max(40, {message: "Adresa je příliš dlouhá"}),
    city: z.string().min(1, {message: "Město je povinné",}).max(40, {message: "Mšsto je příliš dlouhé"}),
    zip: z.number().min(2, {message: "PSČ je povinné",}),
})

export type ValidationScheme = z.infer<typeof validationUserOrderScheme>;

export type cartItem = {
    productId: string,
    name: string,
    image: string,
    price: number,
    quantity: number,
    cartId: string
}

export type userInfo = {
    firstname: string,
    lastname:string,
    email: string,
    phone:number,
    address: string,
    city: string,
    zip: number
}