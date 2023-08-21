import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./Shop.module.css";
import sortByPrice from "../../utils/sortByPrice";
import filterByPrice from "../../utils/filterByPrice";

export default function ShopProducts(props) {
  const { data } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchedData = JSON.parse(data)?.map(product => {
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
    setProducts(fetchedData);
  }, [data]);

  function handleSort(param) {
    searchParams.set('s', param);
    setSearchParams(searchParams);
  }

  return (
    <>
    <div className={styles.results}>
      <div className={styles.resultsHeader}>
        <h2>Results</h2>
        <div className={styles.resultsSort}>
          <h4>Sort by</h4>
          <button onClick={() => handleSort('popularity')}>Popularity</button>
          <button onClick={() => handleSort('reviews')}>Reviews</button>
          <button onClick={() => handleSort('price')}>Price</button>
        </div>
      </div>
      <p>Check each product page for other buying options.</p>
      <div className={styles.products}>
        {products}
      </div>
    </div>
    </>
  )
}