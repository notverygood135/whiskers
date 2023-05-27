function calculatePrice(price, discount) {
  const priceWhole = Math.floor(price);
  const priceDecimal = (price - priceWhole).toFixed(2) * 100;
  const newPrice = price * (100 - discount) / 100;
  const newPriceWhole = Math.floor(newPrice);
  const newPriceDecimal = (newPrice - newPriceWhole).toFixed(2) * 100;
  return { priceWhole, priceDecimal, newPriceWhole, newPriceDecimal }
}

export default calculatePrice;