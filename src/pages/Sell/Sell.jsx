import { useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import { nanoid } from "nanoid";

export default function Sell() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data, loading, error } = useFetch('http://localhost:3000/categories');
  const [preview, setPreview] = useState(false);

  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  const fetchedData = JSON.parse(data);
  const categories = fetchedData?.map(category => {
    return <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
  });

  function onSubmit(data) {
    const formData = new FormData();
    const { category_id, product_name, quantity, price, discount, description } = data;
    const image = data.image[0].name;
    formData.append('image', data.image[0]);
    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
    fetch('http://localhost:3000/products', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image, category_id, product_name, quantity, price, discount, description })
    })
    .then(response => {
      console.log(response.json());
      // return response.json();
    })
  }

  function handleChange(event) {
    const image = event.target.files[0]
    const newUrl = URL.createObjectURL(image);
    setPreview(newUrl);
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type='file'
        id='name'
        accept=".png, .jpg, .jpeg"
        {...register('image', {
          required: true,
          onChange: handleChange
        })} 
      />
      <label htmlFor="">
        <select {...register('category_id', {required: true})}>
          {categories}
        </select>
      </label>
      <input placeholder="Name"{...register('product_name', {required: true})} />
      <input placeholder="Quantity" {...register('quantity', {required: true})} />
      <input placeholder="Price" {...register('price', {required: true})} />
      <input placeholder="Discount" {...register('discount', {required: true})} />
      <input placeholder="Description" {...register('description', {required: true})} />
      <button type='submit'>Finish</button>
    </form>
    {preview && <img src={preview} className={preview} />}
    </> 
  )
}