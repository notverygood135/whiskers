import { useState, useEffect, useRef, forwardRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './Cart.module.css'
import { AiFillDelete } from "react-icons/ai";

export default function CartProduct(props) {
  const { id, image, productName, quantity, maxQuantity, price, discountedPrice, checkedAll, checkedProducts, deleteProduct } = props;
  const [checked, setChecked] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(quantity);
  const { register, getValues, setValue, formState: { errors } } = useForm();
  
  useEffect(() => {
    setChecked(checkedAll);
    setValue('checked', checkedAll);
  }, [checkedAll]);

  useEffect(() => {
    checkedProducts(id, getValues().checked , getValues().quantity * discountedPrice);
  }, [checked, buyQuantity])

  function handleAdd() {
    if (buyQuantity < maxQuantity) {
      setBuyQuantity(buyQuantity + 1);
      setValue('quantity', `${buyQuantity + 1}`);
    }
  }

  function handleSubtract() {
    if (buyQuantity > 1) {
      setBuyQuantity(buyQuantity - 1);
      setValue('quantity', `${buyQuantity - 1}`);
    }
  }

  function handleQuantityChange(event) {
    const inputQuantity = +event.target.value;
    if (inputQuantity > maxQuantity) {
      setBuyQuantity(maxQuantity);
    }
    else if (inputQuantity < 1) {
      setBuyQuantity(1);
    }
    else {
      setBuyQuantity(inputQuantity);
    }
  }

  function handleCheck() {
    setChecked(!checked);
  }

  return (
    <form className={styles.product}>
      <input 
        type="checkbox" 
        checked={checked}  
        {...register(
          'checked',
          {onChange: handleCheck}
        )}
      />
      <div className={styles.infoWrapper}>
        <img src={`/products/${image}`} className={styles.image}/>
        <p>{productName}</p>
      </div>
      <div className={styles.priceWrapper}>
        <del className={styles.oldPrice}>${price.toFixed(2)}</del>
        <p className={styles.price}>${discountedPrice.toFixed(2)}</p>
      </div>
      <div className={styles.changeQuantityWrapper}>
        <button type='button' className={styles.changeQuantityButton} onClick={handleSubtract}>-</button>
        <div className={styles.buyInputWrapper}>
          <input
            value={buyQuantity}
            className={styles.buyInput}
            {...register(
              'quantity', 
              {onChange: e => handleQuantityChange(e)}
            )}
          />
        </div>
        <button type='button' className={styles.changeQuantityButton} onClick={handleAdd}>+</button>
      </div>
      <p className={styles.total}>${(discountedPrice * buyQuantity).toFixed(2)}</p>
      <button type='button' className={styles.delete} onClick={() => deleteProduct(id)}><AiFillDelete/></button>
    </form>
  )
}