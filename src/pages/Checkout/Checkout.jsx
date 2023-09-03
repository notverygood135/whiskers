import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import CheckoutProduct from './CheckoutProduct';
import styles from './Checkout.module.css'

export default function Checkout() {
  const location = useLocation();
  const { state } = location;
  const [products, setProducts] = useState([]);
  const stateProducts = state.products;
  const total = state.total;

  useEffect(() => {
    let checkedProducts = [];
    for (let product in stateProducts) {
      if (stateProducts[product].checked) {
        checkedProducts.push({...stateProducts[product], id: product});
      }
    }
    setProducts(checkedProducts);
  }, []);

  const checkoutProducts = products?.map(product => {
    return (
      <CheckoutProduct
        key={product.id}
        id={product.id}
        sellerId={product.sellerId}
        image={product.image}
        productName={product.productName}
        quantity={product.quantity}
        discountedPrice={product.discountedPrice}
        sum={product.sum}
      />
    )
  })

  function placeOrder(products) {
    let checkoutProducts = [];
    products.forEach(product => {
      checkoutProducts.push({ id: product.id, quantity: product.quantity })
    });
    fetch('http://localhost:3000/checkout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(checkoutProducts)
    })
    .then(response => {
      if (response.ok) return response.json();
    })
    .then(({ url }) => {
      window.location = url;
    })
    .catch(error => {
      console.log(error);
    })
    ;
  }

  return (
    <>
    <div className={styles.product}>
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
    {checkoutProducts}
    <div className={styles.checkout}>
      Total: {`$${total.toFixed(2)} (${products.length} items)`}
      <button className={styles.checkoutButton} onClick={() => placeOrder(products)}>
        Place Order
      </button>
    </div>
    </>
  )
}