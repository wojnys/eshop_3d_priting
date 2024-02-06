interface alertProps {
    message: string
    successMessage: boolean,
    setVisibleAlert: (status: boolean) => void
}

function MessageAlert({message, successMessage, setVisibleAlert}:alertProps) {
    return (
        <div
            className={`${successMessage ? "bg-secondary" : "bg-red-700"} text-white border border-white px-4 py-3 rounded fixed bottom-3 left-3 z-30 w-72`}
            role="alert">
            <p className="w-11/12">{message}</p>
            <span className="absolute top-0 bottom-0 right-0 px-3 py-3">
                    <svg className="fill-current h-6 w-6 text-blue-300" role="button" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 20 20" onClick={() => {
                        setVisibleAlert(false)
                    }}><title>Close</title><path
                        d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </span>
        </div>
    );
}

export default MessageAlert;