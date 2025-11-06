export const CartUtils = (cartItems, quantity) => {
    const totalPrice = cartItems.reduce((acc, food) => acc + food.price * quantity[food.id], 0)
    const totalQuantity = cartItems.reduce((acc, food) => acc + quantity[food.id], 0)
    const hasItems = totalQuantity > 0
    const totalShipping = hasItems ? ((totalQuantity > 10) ? 0 : 10) : 0
    const totalTax = hasItems ? ((totalQuantity > 10) ? 0 : (totalQuantity * 0.2)) : 0
    const totalAmount = hasItems ? (totalPrice + totalShipping + totalTax) : 0
    return { totalPrice, totalQuantity, hasItems, totalShipping, totalTax, totalAmount }
}