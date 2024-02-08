import React from 'react';

function Loading() {
    return (
        <div className={"w-full flex justify-center items-center h-screen flex-col"}>
            <div className={"w-10 h-10 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"}/>
            Načítám...
        </div>
    );
}

export default Loading;