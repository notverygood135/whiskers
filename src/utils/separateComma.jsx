function separateComma(price, discountedPrice) {
  const priceWhole = Math.floor(price);
  const priceDecimal = (price - priceWhole).toFixed(2) * 100;
  const newPriceWhole = Math.floor(discountedPrice);
  const newPriceDecimal = (discountedPrice - newPriceWhole).toFixed(2) * 100;
  return { priceWhole, priceDecimal, newPriceWhole, newPriceDecimal }
}

export default separateComma;