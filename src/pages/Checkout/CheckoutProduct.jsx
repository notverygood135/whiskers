import { useState, useEffect } from 'react';
import styles from './Checkout.module.css'

export default function CheckoutProduct(props) {
  const { image, productName, quantity, discountedPrice, sum } = props;

  return (
    <form className={styles.product}>
      <div className={styles.infoWrapper}>
        <img src={`/products/${image}`} className={styles.image}/>
        <p>{productName}</p>
      </div>
      <div className={styles.priceWrapper}>
        <p className={styles.price}>${discountedPrice.toFixed(2)}</p>
      </div>
      <div className={styles.quantity}>
        <p>{quantity}</p>
      </div>
      <p className={styles.total}>${sum.toFixed(2)}</p>
    </form>
  )
}