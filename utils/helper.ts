// Format the price above to USD using the locale, style, and currency.
let CZKPrice = new Intl.NumberFormat('cs-CS', {
    style: 'currency',
    currency: 'CZK',
    maximumSignificantDigits: 1,
});

export const formatPrice = (price: number) => {
    return CZKPrice.format(price);
}