import styles from './Main.module.css'

function Category(props) {
  
  return (
    <div className={styles.categoryContainer}>
      <h3>{props.categoryName}</h3>
      <div className={styles.categoryImageWrapper}>
        <img src={`/categories/${props.categoryImage}`} className={styles.categoryImage}/>
      </div>
    </div>
  )
}

export default Category;