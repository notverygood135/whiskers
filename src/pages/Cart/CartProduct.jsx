export default function CartProduct(props) {
  const { image, productName, quantity, price, discountedPrice } = props;

  return (
    <>
      <input type="checkbox"/>
      <img src={`/products/${image}`}/>
      <h1>{productName}</h1>
      <h1>{quantity}</h1>
      <h1>{price}</h1>
      <h1>{discountedPrice}</h1>
    </>
  )
}