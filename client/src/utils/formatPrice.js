export function formatPrice(amount) {
  return `RD$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function getDiscountedPrice(product) {
  if (!product.discount) return product.price;
  return Math.round(product.price * (1 - product.discount / 100));
}
