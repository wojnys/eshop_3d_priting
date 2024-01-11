import '@styles/globals.css'
import { ReactNode } from 'react';
import Navbar from '@components/Navbar/Navbar';
import {Metadata} from "@node_modules/next";


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
                    <Navbar />
                    {children}
                </main>
            </body>
        </html>
    );
}

export default RootLayout;