import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import ProductItem from "../../components/ProductItem/ProductItem";
import styles from "./Shop.module.css";
import ShopFormCheckbox from "./ShopFormCheckbox";
import sortByPrice from "../../utils/sortByPrice";

export default function Shop() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState(searchParams.get('cid') ? searchParams.get('cid').split(',') : []);
  const cid = searchParams.get('cid');
  const s = searchParams.get('s');
  const { data, loading, error } = useFetch(`http://localhost:3000/products/${cid}/${0}`);

  useEffect(() => {
    setSelectedCategories(searchParams.get('cid') ? searchParams.get('cid').split(',') : []);
  }, [searchParams.get('cid')])

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  let products = fetchedData?.map(product => {
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

  function handleCategory(element) {
    const id = element.target.id;
    const arr = !selectedCategories.includes(id) ? 
      [...selectedCategories, id] 
      : selectedCategories.filter(item => item != id);
    setSelectedCategories(arr);
    if (arr.length) {
      searchParams.set('cid',  `${arr.sort((a, b) => a - b).join(',')}`);
    }
    else {
      searchParams.delete('cid');
    }
    setSearchParams(searchParams);
  }

  function handleSort(blah) {
    searchParams.set('s', blah);
    setSearchParams(searchParams);
    if (blah == 'price') {
      products = sortByPrice(products);
    }
  }

  function onSubmit(priceRange) {
    const { min, max } = priceRange;
    min != '' ? searchParams.set('min', min) : searchParams.delete('min');
    max != '' ? searchParams.set('max', max) : searchParams.delete('max');
    setSearchParams(searchParams);
  }

  const categoriesList = [
    {categoryName: 'Food', categoryId: '1'},
    {categoryName: 'Treats', categoryId: '2'},
    {categoryName: 'Litter', categoryId: '3'},
    {categoryName: 'Toys', categoryId: '4'},
    {categoryName: 'Health Supplies', categoryId: '5'},
    {categoryName: 'Beds', categoryId: '6'},
    {categoryName: 'Bowls & Feeders', categoryId: '7'},
    {categoryName: 'Scratchers & Trees', categoryId: '8'},
    {categoryName: 'Grooming', categoryId: '9'},
    {categoryName: 'Others', categoryId: '10'},
  ];
  const categories = categoriesList.map(category => {
    return (
      <ShopFormCheckbox
        key = {category.categoryId}
        categoryId = {category.categoryId}
        categoryName = {category.categoryName}
        checked = {selectedCategories.includes(category.categoryId)}
        handleCategory = {handleCategory}
      />
    )
  });

  return (
    <>
    <div className={styles.shop}>
      <aside className={styles.sidebar}>
        <h2 id={styles.sideText}>Search Filter</h2>
        <form className={styles.sideForm}>
          <h3 id={styles.sideText}>Categories</h3>
          {categories}
        </form>
        <form className={styles.sideForm} onSubmit={handleSubmit(onSubmit)}>
          <h3 id={styles.sideText}>Price Range</h3>
          <div className={styles.priceRange}>
            <input placeholder="Min" className={styles.priceRangeField} {...register('min')}/>
            <h3>to</h3>
            <input placeholder="Max" className={styles.priceRangeField} {...register('max')}/>
          </div>
          <button className={styles.button}>Apply</button>
        </form>
      </aside>
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
    </div>
    </>
  )
}