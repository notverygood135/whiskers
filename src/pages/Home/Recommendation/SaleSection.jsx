import useFetch from '../../../hooks/useFetch';
import sortByDiscount from '../../../utils/sortByDiscount';
import ProductItem from '../../../components/ProductItem/ProductItem';
import styles from './Main.module.css'

function SaleSection() {
  const { data, loading, error } = useFetch('http://localhost:3000/home');

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const products = fetchedData?.map(product => {
    return (
      <ProductItem
        key={product.product_id}
        id={product.product_id}
        image = {product.image}
        productName = {product.product_name}
        price = {product.price}
        discount = {product.discount}
        discountedPrice = {product.discounted_price}
      />
    )
  });

  return (
    <section className={styles.mainSection}>
      <h2>Best Deals</h2>
      <div id={styles.recommendationSectionProducts}>
        {sortByDiscount(products)?.slice(0, 4)}
      </div>
    </section>
  )
}

export default SaleSection;