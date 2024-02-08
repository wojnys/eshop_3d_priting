'use client'
import React from 'react';
import {UserButton, useUser, UserProfile, SignedOut} from "@clerk/nextjs";
import Link from "next/link";

function NavbarEshopLinks() {
    const {user, isLoaded} = useUser();
    return (
        <div>
            {
                user && isLoaded && (
                    <ul className={"flex "}>
                        <Link href={"/admin/user-profile"}>Přehled objednávek</Link>
                        <UserButton afterSignOutUrl={'/eshop'} >
                            <button>My Account</button>
                        </UserButton>
                    </ul>
                )
            }
        </div>
    );
}

export default NavbarEshopLinks;