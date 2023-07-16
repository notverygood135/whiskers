import Category from './Category';
import useFetch from "../../../hooks/useFetch";
import styles from './Main.module.css'
import { NavLink } from 'react-router-dom';

function CategorySection() {
  const { data, loading, error } = useFetch('http://localhost:3000/categories');

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const categories = fetchedData?.map(category => {
    return (
      <Category
        key={category.category_id}
        categoryId={category.category_id}
        categoryName={category.category_name}
        categoryImage={category.image}
      />
    )
  });  

  return (
    <section className={styles.mainSection}>
      <h2>Shop by Category</h2>
      <div id={styles.categories}>
        {categories}
      </div>
    </section>
  )
}

export default CategorySection;