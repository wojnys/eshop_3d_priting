import React, { useEffect } from 'react';
import Swal from 'sweetalert2'

interface MessageBoxProps {
    successStatus: boolean;
    messages: string[];
}


const SweetAlert = ({ successStatus,  messages}:MessageBoxProps) => {
    useEffect(() => {
            Swal.fire({
                icon: successStatus ? "success" : "error",
                title: successStatus ? "Dokončeno" : "Vyskytla se chyba",
                html: messages.map((message, index) => `<li class="text-left ${successStatus ? "text-green-600" : "text-red-600 "} m-1 rounded p-2" key=${index}>${message}</li>`).join('') // Render messages as HTML paragraphs
            }).then((result) => {
                if (( result.dismiss === Swal.DismissReason.backdrop && successStatus) || (result.isConfirmed && successStatus)) {
                    window.location.href = "/eshop"
                }
            });
    }, [successStatus, messages]);

    return null;
};

function SweetAlertMessageBox({successStatus, messages}: MessageBoxProps) {
    return (
        <div className={"w-full"}>
            <SweetAlert
                successStatus={successStatus}
                messages={messages}
            />
        </div>
    );
}

export default SweetAlertMessageBox;