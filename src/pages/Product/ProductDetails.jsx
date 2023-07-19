import { useSearchParams } from 'react-router-dom'
import { useState, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import getProductDetails from '../../utils/getProductDetails';
import styles from './Product.module.css'
import { LoginContext } from '../../context/LoginContext';

function ProductDetails() {
  const { isAuth, token, setAuth } = useContext(LoginContext);
  console.log(token);
  const [searchParams, setSearchParams] = useSearchParams();
  const [buyQuantity, setBuyQuantity] = useState(0);
  const id = searchParams.get('pid');
  const { data, loading, error } = useFetch(`http://localhost:3000/products/${id}`);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const productDetails = JSON.parse(data);
  const { category, description, discount, image, priceWhole, priceDecimal, newPriceWhole, newPriceDecimal, productName, quantity } = productDetails ? getProductDetails(productDetails) : {}

  function handleAdd() {
    if (buyQuantity < quantity) {
      setBuyQuantity(prevQuantity => prevQuantity + 1);
    }
  }

  function handleSubtract() {
    if (buyQuantity) {
      setBuyQuantity(prevQuantity => prevQuantity - 1);
    }
  }

  return (
    <>
    <div className={styles.details}>
      <div className={styles.imageWrapper}>
        <img src='/vecteezy_black-and-white-cat-close-up_2412790.jpg' alt={productName} className={styles.image}/>
      </div>
      <div className={styles.textWrapper}>
        <h1>{productName}</h1>
        <h2>{quantity} in stock</h2>
        {productDetails?.discount ? 
          <div className={styles.price}>
            <del className={styles.oldPrice}>
              <h1>${priceWhole}.{priceDecimal}</h1>
            </del>
            <h1>${newPriceWhole}.{newPriceDecimal}</h1>
          </div>
          :
          <div className={styles.price}>
            <h1>${priceWhole}.{priceDecimal}</h1>
          </div>}
        <div className={styles.buttonContainer}>
          <div className={styles.changeQuantityWrapper}>
            <button className={styles.changeQuantityButton} onClick={handleSubtract}>-</button>
            <div className={styles.changeQuantityText}><h3>{buyQuantity}</h3></div>
            <button className={styles.changeQuantityButton} onClick={handleAdd}>+</button>
          </div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button} id={styles.buyNow}>Buy now</button>
            <button className={styles.button} id={styles.addToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div className={styles.description}>
      <h2>Description</h2>
      <p>{description}</p>
    </div>
    </>
  )
}

export default ProductDetails;