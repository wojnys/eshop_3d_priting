'use client';
import React from 'react';
import {useParams} from "@node_modules/next/dist/client/components/navigation";

function Page() {
    const {id} = useParams();
    return (
        <section className={"section-container-no-flex"}>
            {id}
            <p>DETAIL PAGE </p>
        </section>
    );
}

export default Page;