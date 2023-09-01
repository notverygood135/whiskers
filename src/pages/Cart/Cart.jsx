import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { NavLink } from 'react-router-dom';
import calculateTotal from "../../utils/calculateTotal";
import CartProduct from "./CartProduct";
import styles from './Cart.module.css'

export default function Cart() {
  console.log('a');
  const [checkedAll, setCheckedAll] = useState(false);
  const [products, setProducts] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(calculateTotal(products));
    console.log(products);
  }, [products]);

  const { data, loading, error } = useFetch('http://localhost:3000/cart');
  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const cartProducts = fetchedData?.map(product => {
    return (
      <CartProduct
        key={product.product_id}
        id={product.product_id}
        image={product.image}
        productName={product.product_name}
        quantity={product.quantity}
        maxQuantity={product.max_quantity}
        price={product.price}
        discount={product.discount}
        discountedPrice={product.discounted_price}
        checkedProducts={checkedProducts}
        checkedAll={checkedAll}
        deleteProduct={deleteProduct}
      />
    )
  });

  function checkAll() {
    setCheckedAll(!checkedAll);
  }

  function checkedProducts(pid, checked, sum) {
    let newProducts = products;
    newProducts[pid] = {checked, sum};
    setProducts({...newProducts});
  }

  function deleteProduct(pid) {
    fetch('http://localhost:3000/cart', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product_id: pid })
    })
    .then(response => {
      setProducts(prevProducts => {
        delete prevProducts[pid];
        return {...prevProducts}
      })
      return response.text()
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
      <div className={styles.product}>
        <input type="checkbox" onChange={checkAll}/>
        <div className={styles.infoWrapper} >
          <p id={styles.infoColumn}>Product</p>
        </div>
        <div className={styles.priceWrapper}>
          <p>Unit Price</p>
        </div>
        <div className={styles.quantity}>
          <p>Quantity</p>
        </div>
        <p className={styles.total}>Item Subtotal</p>
      </div>
      {cartProducts}
      <div className={styles.checkout}>
        Total: {`${total.toFixed(2)} (${Object.keys(products).length} items)`}
        <button className={styles.checkoutButton}><NavLink to='/checkout'>Checkout</NavLink></button>
      </div>
    </>
  )
}