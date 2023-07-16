import styles from './Main.module.css'
import { NavLink } from 'react-router-dom';

function Category(props) {
  const { categoryId, categoryName, categoryImage } = props;
  const url = `/shop/${categoryName.replace(/\s+/g, '-')}?cid=${categoryId}`;

  return (
    <NavLink to={url}>
      <div className={styles.categoryContainer}>
        <h3>{categoryName}</h3>
        <div className={styles.categoryImageWrapper}>
          <img src={`/categories/${categoryImage}`} className={styles.categoryImage}/>
        </div>
      </div>
    </NavLink>
  )
}

export default Category;