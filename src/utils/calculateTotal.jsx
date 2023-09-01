export default function calculateTotal(products) {
    let sum = 0;
    for (const key in products) {
        if (products[key].checked) {
            sum += products[key].sum
        }
    }
    return sum;
}