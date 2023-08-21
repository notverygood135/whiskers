import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ShopFormCheckbox from "./ShopFormCheckbox";
import styles from "./Shop.module.css";

export default function ShopFilter(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const cid = searchParams.get('cid');
  const [selectedCategories, setSelectedCategories] = useState(cid ? cid.split(',') : []);

  useEffect(() => {
    setSelectedCategories(cid ? cid.split(',') : []);
  }, [cid])

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
    </>
  )
}