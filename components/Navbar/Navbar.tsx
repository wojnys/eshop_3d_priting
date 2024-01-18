'use client';

import Link from "next/link";
import  { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";


interface Link {
    id: number,
    link: string,
    name: string
}
const Navbar = () => {
    const [nav, setNav] = useState<Boolean>(false);

    const links: Link[]  = [
        {
            id: 1,
            link: "/",
            name: "Home",
        },
        {
            id: 2,
            link: "about",
            name: "Home",
        },
        {
            id: 3,
            link: "portfolio",
            name: "Home",
        },
        {
            id: 4,
            link: "experience",
            name: "Home",
        },
        {
            id: 5,
            link: "contact",
            name: "Home",
        },
    ];

    return (
        <div className={`flex justify-center items-center w-11/12 m-auto mt-3 h-20 px-4 rounded-3xl text-white bg-secondary-800 fixed nav z-50 ${!nav ? `relative` : `w-full`} `}>
            <ul className="hidden md:flex">
                {links.map(({ id, link , name}) => (
                    <li
                        key={id}
                        className="nav-links px-4 cursor-pointer capitalize font-medium text-white"
                    >
                        <Link href={link}>{name}</Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer pr-4 z-10 text-black-500 md:hidden"
                style={{position:"absolute",right:"40px", top:"30px", color:"black"}}
            >
                {nav ? <FaTimes size={30} color={"white"} /> : <FaBars size={30} color={"white"}/>}
            </div>

            {nav && (
                <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen mb-10 bg-gradient-to-b bg-secondary rounded-3xl text-black">
                    {links.map(({ id, link, name }) => (
                        <li
                            key={id}
                            className="px-4 cursor-pointer capitalize py-6 text-2xl text-white"
                        >
                            <Link onClick={() => setNav(!nav)} href={link}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Navbar;