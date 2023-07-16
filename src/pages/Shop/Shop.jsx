import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./Shop.module.css";

export default function Shop() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('cid');
  const { data, loading, error } = useFetch('http://localhost:3000/products');

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const products = fetchedData?.map(product => {
    return (
      <div className={styles.productWrapper} key={product.product_id}>
        <ProductItem
          id={product.product_id}
          image = {product.image}
          productName = {product.product_name}
          price = {product.price}
          discount = {product.discount}
          discountedPrice = {product.discounted_price}
        />
      </div>
    )
  });

  return (
    <>
    <div className={styles.shop}>
      <aside className={styles.sidebar}>
        <h2 id={styles.sideText}>Search Filter</h2>
        <form className={styles.sideForm}>
          <h3 id={styles.sideText}>Categories</h3>
          <div>
            <input type="checkbox" name="category" id="food"/>
            <label htmlFor="food">Food</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="treats"/>
            <label htmlFor="treats">Treats</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="litter"/>
            <label htmlFor="litter">Litter</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="toys"/>
            <label htmlFor="toys">Toys</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="healthsupplies"/>
            <label htmlFor="healthsupplies">Health Supplies</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="beds"/>
            <label htmlFor="beds">Beds</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="bowlsfeeders"/>
            <label htmlFor="bowlsfeeders">Bowls & Feeders</label></div>
          <div><input type="checkbox" name="category" id="scratchertrees"/><label htmlFor="scratchertrees">Scratcher & Trees</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="grooming"/>
            <label htmlFor="grooming">Grooming</label>
          </div>
          <div>
            <input type="checkbox" name="category" id="others"/>
            <label htmlFor="others">Others</label>
          </div>
        </form>
        <form className={styles.sideForm}>
          <h3 id={styles.sideText}>Price Range</h3>
          <div className={styles.priceRange}>
            <input placeholder="Min" className={styles.priceRangeField}/>
            <h3>to</h3>
            <input placeholder="Max" className={styles.priceRangeField}/>
          </div>
        </form>
      </aside>
      <div className={styles.results}>
        <h2>Results</h2>
        <p>Check each product page for other buying options.</p>
        <div className={styles.products}>
          {products}
        </div>
      </div>
    </div>
    </>
  )
}