import calculatePrice from '../../utils/calculatePrice';
import styles from './ProductItem.module.css'
import { AiOutlineShoppingCart, AiTwotoneShopping } from "react-icons/ai";

function ProductItem(props) {
  const { image, productName, price, discount } = props;
  const { priceWhole, priceDecimal, newPriceWhole, newPriceDecimal } = calculatePrice(price, discount);

  return (
    <div className={styles.productContainer}>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <img src={'/vecteezy_black-and-white-cat-close-up_2412790.jpg'} alt="test" className={styles.productImage}/>
        </div>
        <div className={styles.productText}>
          <h3>{productName}</h3>
          {discount ? 
            <div className={styles.price}>
              <del className={styles.oldPrice}>
                <h3>${priceWhole}</h3>
                <h4>{priceDecimal}</h4>
              </del>
              <h3>${newPriceWhole}</h3>
              <h4>{newPriceDecimal}</h4>
            </div>
            :
            <div className={styles.price}>
              <h3>${priceWhole}</h3>
              <h4>{priceDecimal}</h4>
            </div>
          }
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.productButton} id={styles.buyNow}>Buy now</button>
          <button className={styles.productButton} id={styles.addToCart}>Add to cart</button>
        </div>
        <div className={styles.buttonWrapperMobile}>
          <button className={styles.productButton} id={styles.buyNow}><AiTwotoneShopping /></button>
          <button className={styles.productButton} id={styles.addToCart}><AiOutlineShoppingCart /></button>
        </div>
      </div>
    </div>
  )
}

export default ProductItem;