export class CurrencyFormatter {
    static formatCurrency(value) {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
}