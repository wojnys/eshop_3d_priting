'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link";

function InfoNavbar() {
    const pathname = usePathname()
    console.log(pathname)
    return (
        <div className={"h-20 flex flex-row flex-start p-5 "}>
            <div className={"justify-center items-center flex flex-row"}>
                <span className={`${pathname === "/eshop/cart" ? "bg-secondary" : "bg-slate-300"  }  rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center p-4`}><p className={"text[10px] sm:text-[15px] text-white"}>1</p></span>
                <button className={"text-black text-[15px] sm:text-[20px]"} >Košík</button>
            </div>
            <div className={"justify-center items-center flex flex-row "}>
                <div>
                    <div className={"w-6 sm:w-12 bg-gray-400 h-1 rounded relative ml-5"}></div>
                </div>
                <span className={`${pathname.includes("payment-info") ? "bg-secondary" : "bg-slate-300" } rounded-full w-6 h-6 flex items-center justify-center p-4`}><p className={"text-[1opx] text-white"}>2</p></span>
                <button className={"text-black text-[15px] sm:text-[20px] text-wrap"}>Doprava</button>
            </div>
            <div className={"justify-center items-center flex flex-row"}>
                <div>
                    <div className={"w-6 sm:w-12 bg-gray-400 h-1 rounded relative ml-5"}></div>
                </div>
                <span className={`${pathname.includes("contact-info") ?  "bg-secondary" : "bg-slate-300" } rounded-full w-6 h-6 flex items-center justify-center p-4`}><p className={"text-[1opx] text-white"}>3</p></span>
                <button className={"text-black text-[15px] sm:text-[20px] text-wrap "}>Kontaktní údaje</button>
            </div>
        </div>
    );
}

export default InfoNavbar;