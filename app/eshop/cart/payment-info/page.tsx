import InfoNavbar from "@app/eshop/cart/InfoNavbar";

export default function PaymentInfo() {
    return (
        <>
            <InfoNavbar/>
            <div className={"p-5 flex flex-col"}>
                <div className={"text-lg"}>
                    <h1>Vyberte Dopravu</h1>

                        <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby="dropdownHelperRadioButton">
                            <li>
                                <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <div className="flex items-center h-5">
                                        <input id="helper-radio-6" name="helper-radio" type="radio" value=""
                                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    </div>
                                    <div className="ms-2 text-sm">
                                        <label className="font-medium text-gray-900 dark:text-gray-300">
                                            <div>Non profit</div>
                                            <p id="helper-radio-text-6"
                                               className="text-xs font-normal text-gray-500 dark:text-gray-300">Some
                                                helpful instruction goes over here.</p>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>

                </div>
                <div className={"text-lg"}>
                    <h1>Vyberte Platbu</h1>
                </div>
            </div>
        </>
    )
}