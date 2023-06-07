import separateComma from "./separateComma";

function getProductDetails(productDetails) {
  const { priceWhole, priceDecimal, newPriceWhole, newPriceDecimal } = separateComma(productDetails.price, productDetails.discounted_price);
  return { 
    category: productDetails.category_name,
    description: productDetails.description,
    discount: productDetails.discount,
    image: productDetails.image,
    priceWhole: priceWhole,
    priceDecimal: priceDecimal,
    newPriceWhole: newPriceWhole,
    newPriceDecimal: newPriceDecimal,
    productName: productDetails.product_name,
    quantity: productDetails.quantity,
  }
}
  
export default getProductDetails;