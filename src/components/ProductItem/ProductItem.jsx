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
          <img src={`/products/${image}`} alt="test" className={styles.image}/>
        </div>
        <div className={styles.text}>
          <h3>{truncate(productName, 20)}</h3>
          {discount ? 
            <div className={styles.price}>
              <del className={styles.oldPrice}>
                <h3>${priceWhole}.{priceDecimal.toFixed(0)}</h3>
              </del>
              <h3>${newPriceWhole}.{newPriceDecimal.toFixed(0)}</h3>
            </div>
            :
            <div className={styles.price}>
              <h3>${priceWhole}.{priceDecimal.toFixed(0)}</h3>
            </div>
          }
        </div>
      </div>
    </div>
    </NavLink>
  )
}

export default ProductItem;