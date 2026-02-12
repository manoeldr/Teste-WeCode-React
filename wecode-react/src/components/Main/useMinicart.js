export function useMinicart(cartItems) {
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.oldPrice || item.price;
      return sum + (itemPrice * item.quantity);
    }, 0);
  };

  const calculateDiscount = () => {
    return cartItems.reduce((sum, item) => {
      if (item.oldPrice) {
        return sum + ((item.oldPrice - item.price) * item.quantity);
      }
      return sum;
    }, 0);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = subtotal - discount;

  return {
    formatPrice,
    subtotal,
    discount,
    total
  };
}