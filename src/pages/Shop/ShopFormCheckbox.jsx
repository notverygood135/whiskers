export default function ShopFormCheckbox(props) {
  const { categoryName, categoryId, handleCategory, checked } = props;

  return(
    <div>
      <input onChange={handleCategory} type="checkbox" name="category" id={categoryId} checked = {checked}/>
      <label htmlFor={categoryId}>{categoryName}</label>
    </div>
  )
}