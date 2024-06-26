import {redirect} from "@node_modules/next/dist/client/components/redirect";
import {getCart} from "@app/lib/db/cart";
import ShoppingCartButton from "@app/eshop/product/Navbar/ShoppingCartButton";
import Link from "next/link";
import NavbarEshopLinks from "@app/eshop/product/Navbar/NavbarEshopLinks";

const searchProducts = async (formData: FormData) => {
    'use server';

    const searchQuery = formData.get('searchQuery')?.toString();
    if (searchQuery) {
        redirect("/search?query=" + searchQuery);
    }
}

export default async  function EshopNavbar() {

    const cart = await getCart();

    return (
        <div className={'bg-primary w-full mb-4'}>
            <div className="navbar w-11/12 m-auto flex-row gap-2 flex justify-between items-center h-20">
                <div className={'text-white'}>
                    <Link href={'/eshop'}>Eshop</Link>
                </div>
                <div className={"flex-none gap-2"}>
                    <form action={searchProducts}>
                        <div className={"form-control"}>
                            <input type="text" placeholder={"Search"} name={"searchQuery"}
                                   className={"border-20 border-green-400 rounded p-1 sm:w-80 w-56 "}/>
                        </div>
                    </form>
                </div>
                <ShoppingCartButton cart={cart}/>
            </div>
            <div className={"flex justify-center w-full bg-primary"}>
                <NavbarEshopLinks />
            </div>
        </div>
    )
}