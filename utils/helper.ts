// Format the price above to USD using the locale, style, and currency.
let CZKPrice = new Intl.NumberFormat('cs-CS', {
    style: 'currency',
    currency: 'CZK',
    maximumSignificantDigits: 10,
});

export const formatPrice = (price: number) => {
    return CZKPrice.format(price);
}

// Function to convert MongoDB date to Prague time
export const convertToPragueTime = (mongoDate: Date) => {
    const pragueTime = new Date(mongoDate).toLocaleString('en-US', {
        timeZone: 'Europe/Prague',
        hour12: false,
    });

    const year = new Date(pragueTime).getFullYear();
    const month =new Date(pragueTime).getMonth() + 1 ;
    const day = new Date(pragueTime).getDate() + 1;

    const hours = new Date(pragueTime).getHours().toString().padStart(2, '0');
    const minutes = new Date(pragueTime).getMinutes().toString().padStart(2, '0');
    const seconds = new Date(pragueTime).getSeconds().toString().padStart(2, '0');
    return `${day}.${month}.${year} / ${hours}:${minutes}:${seconds}`;
};