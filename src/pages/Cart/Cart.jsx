import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import CartProduct from "./CartProduct";

export default function Cart() {
  const { data, loading, error } = useFetch('http://localhost:3000/cart');
  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const cartProducts = fetchedData?.map(product => {
    return (
      <CartProduct
        key={product.product_id}
        id={product.product_id}
        image = {product.image}
        productName = {product.product_name}
        quantity = {product.quantity}
        price = {product.price}
        discount = {product.discount}
        discountedPrice = {product.discounted_price}
      />
    )
  });

  return (
    <>
      {cartProducts}
    </>
  )
}