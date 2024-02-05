import '@styles/globals.css'
import { ReactNode } from 'react';
import {Metadata} from "@node_modules/next";
import EshopNavbar from "@app/eshop/product/Navbar/EshopNavbar";

export const metadata: Metadata = {
    title: 'LED/Neonové texty či výrobky na míru',
    description: 'Tisk všech 3D produktů na míru '
}

function RootLayout({children} : {children: ReactNode}) {
    return (
        <html lang={'cs'}>
            <body>
                <div className="main">
                    <div className={'gradient'}></div>
                </div>

                <main className="app">
                    <EshopNavbar />
                    {children}
                </main>
            </body>
        </html>
    );
}

export default RootLayout;