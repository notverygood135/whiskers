import { NavLink } from 'react-router-dom';
import styles from './ProductItem.module.css'
import { AiOutlineShoppingCart, AiTwotoneShopping } from "react-icons/ai";
import separateComma from '../../utils/separateComma';
import truncate from '../../utils/truncate';

function ProductItem(props) {
  const { image, id, productName, price, discountedPrice, discount } = props;
  const { priceWhole, priceDecimal, newPriceWhole, newPriceDecimal } = separateComma(price, discountedPrice);
  const url = `/product/${productName.replace(/\s+/g, '-')}?pid=${id}`;

  return (
    <NavLink to={url}>
    <div className={styles.container}>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <img src='/vecteezy_black-and-white-cat-close-up_2412790.jpg' alt="test" className={styles.image}/>
        </div>
        <div className={styles.text}>
          <h3>{truncate(productName, 21)}</h3>
          {discount ? 
            <div className={styles.price}>
              <del className={styles.oldPrice}>
                <h3>${priceWhole}.{priceDecimal}</h3>
              </del>
              <h3>${newPriceWhole}.{newPriceDecimal}</h3>
            </div>
            :
            <div className={styles.price}>
              <h3>${priceWhole}.{priceDecimal}</h3>
            </div>
          }
        </div>
        {/* <div className={styles.buttonWrapper}>
          <button className={styles.button} id={styles.buyNow}>Buy now</button>
          <button className={styles.button} id={styles.addToCart}>Add to cart</button>
        </div>
        <div className={styles.buttonWrapperMobile}>
          <NavLink to='/'><button className={styles.button} id={styles.buyNow}><AiTwotoneShopping /></button></NavLink>
          <NavLink to='/'><button className={styles.button} id={styles.addToCart}><AiOutlineShoppingCart /></button></NavLink>
        </div> */}
      </div>
    </div>
    </NavLink>
  )
}

export default ProductItem;