import { useSearchParams, useNavigate, NavLink } from 'react-router-dom'
import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import useFetch from '../../hooks/useFetch';
import getProductDetails from '../../utils/getProductDetails';
import styles from './Product.module.css'
import { LoginContext } from '../../context/LoginContext';

function ProductDetails() {
  const { userId } = useContext(LoginContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [buyQuantity, setBuyQuantity] = useState(1);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const pid = searchParams.get('pid');
  const { data, loading, error } = useFetch(`http://localhost:3000/products/${pid}`);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const productDetails = JSON.parse(data);
  const { description, image, priceWhole, priceDecimal, newPriceWhole, newPriceDecimal, productName, quantity } = productDetails ? getProductDetails(productDetails) : {}
  const discountedPrice = newPriceWhole + newPriceDecimal / 100;
  // const checked = true;
  // const sum = discountedPrice;

  function handleAdd() {
    if (buyQuantity < quantity) {
      setBuyQuantity(buyQuantity + 1);
    }
  }

  function handleSubtract() {
    if (buyQuantity > 1) {
      setBuyQuantity(buyQuantity - 1);
    }
  }

  function handleChange(event) {
    const inputQuantity = +event.target.value;
    if (inputQuantity > quantity) {
      setBuyQuantity(quantity);
    }
    else if (inputQuantity < 1) {
      setBuyQuantity(1);
    }
    else {
      setBuyQuantity(inputQuantity);
    }
  }

  function onSubmit() {
    fetch('http://localhost:3000/cart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({quantity: buyQuantity, product_id: pid})
    })
    .then(response => {
      return response.text()
    })
    .catch(error => {
      console.log(error);
    })
  }

  function addToCart() {
    if (userId == "") {
      navigate('/login');
      return;
    }
    fetch('http://localhost:3000/cart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({quantity: buyQuantity, product_id: pid})
    })
    .then(response => {
      return response.text()
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <>
    <div className={styles.details}>
      <div className={styles.imageWrapper}>
        <img src={`/products/${image}`} alt={productName} className={styles.image}/>
      </div>
      <div className={styles.textWrapper}>
        <h1>{productName}</h1>
        <h2>{quantity} in stock</h2>
        {productDetails?.discount ? 
          <div className={styles.price}>
            <del className={styles.oldPrice}>
              <h1>${priceWhole}.{priceDecimal.toFixed(0)}</h1>
            </del>
            <h1>${newPriceWhole}.{newPriceDecimal.toFixed(0)}</h1>
          </div>
          :
          <div className={styles.price}>
            <h1>${priceWhole}.{priceDecimal}</h1>
          </div>}
        <form className={styles.buttonContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.changeQuantityWrapper}>
            <button type='button' className={styles.changeQuantityButton} onClick={handleSubtract}>-</button>
            <div className={styles.buyInputWrapper}>
              <input 
                value={buyQuantity}
                className={styles.buyInput}
                {...register(
                  'quantity', 
                  {onChange: e => handleChange(e)}
                )}
              />
            </div>
            <button type='button' className={styles.changeQuantityButton} onClick={handleAdd}>+</button>
          </div>
          <div className={styles.buttonWrapper}>
            {/* <button type='button' 
              className={styles.button} 
              id={styles.buyNow}
              onClick={() => buyNow()}
            >
              Buy now
            </button> */}
            
            <button type='button' 
              className={styles.button} 
              id={styles.buyNow}
            >
              {userId ? 
                <NavLink
                  className={styles.link}
                  to='/checkout'
                  state={{products: {pid: {checked: true, sum: discountedPrice * buyQuantity, quantity: buyQuantity, image, discountedPrice, productName}}, total: discountedPrice * buyQuantity}}
                >
                  Buy now
                </NavLink> : 
                <div onClick={() => navigate('/login')}>Buy now</div>
              }
            </button>
            
            {/* <button type='submit' className={styles.button} id={styles.addToCart}>Add to cart</button> */}
            <button 
              type='button' 
              className={styles.button} 
              id={styles.addToCart} 
              onClick={() => addToCart()}
            >
              Add to cart
            </button>
          </div>
        </form>
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