import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import styles from './Sell.module.css'

export default function Dropdown(props) {
  const { register, formState: { errors } } = useForm();
  const { data, loading, error } = useFetch('http://localhost:3000/categories');

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const categories = fetchedData?.map(category => {
    return <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
  });

  return (
    <>
      <label htmlFor="">
        <select {...register('cid', {required: true})}>
          {categories}
        </select>
      </label>
    </>
  )
}