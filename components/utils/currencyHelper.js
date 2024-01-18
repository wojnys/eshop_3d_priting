const formattedCurrency = (amount) => {
    return new Intl.NumberFormat('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0, // Remove decimal places
        maximumFractionDigits: 0, // Remove decimal places
        useGrouping: false, // Disable thousands separator
    }).format(amount);
}

module.exports = {
    formattedCurrency
};