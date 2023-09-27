import { useEffect, useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import useFetch from "../../hooks/useFetch";
import getUserDetails from "../../utils/getUserDetails";
import { LoginContext } from "../../context/LoginContext";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Account.module.css"
import { AiOutlineUpload } from "react-icons/ai"

export default function Account() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  
  const { userId, setUserId } = useContext(LoginContext);
  const { data, loading, error } = useFetch(`http://localhost:3000/users/${userId}`);
  const [preview, setPreview] = useState(false);

  const userDetails = JSON.parse(data);
  const { fullName, username, email, image } = userDetails ? getUserDetails(userDetails) : {}
  const imagePath = image ? <img src={`/products/${image}`} /> : null
  
  if (loading) return <h1>Loading...</h1>;
  if (error) console.log(error);

  function logout() {
    fetch('http://localhost:3001/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      console.log(response.text());
      setUserId('');
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleChange(event) {
    const image = event.target.files[0]
    const newUrl = URL.createObjectURL(image);
    setPreview(newUrl);
  }

  function handleImage() {
    if (preview) {
      return preview;
    }
    else if (!preview && image) {
      return `/products/${image}`
    }
    else {
      return null
    }
  }

  function onSubmit(data) {
    const formData = new FormData();
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

    fetch('http://localhost:3000/users', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ image, userId })
    })
    .then(response => {
      console.log(response.text());
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <form className={styles.upload} onSubmit={handleSubmit(onSubmit)}>
      <div className={(!handleImage()) ? `${styles.imageWrapper}` : `${styles.imageWrapper} ${styles.active}`}>
        <label htmlFor="name" className={styles.imageInput}>
          {(!handleImage()) &&
          <>
            <AiOutlineUpload className={styles.uploadIcon}/>
            <p className={styles.selectImage}>Choose an image</p>
          </>}
        </label>
        <input 
          type='file'
          id='name'
          accept=".png, .jpg, .jpeg"
          
          {...register('image', {
            required: true,
            onChange: handleChange
          })} 
        />
        {handleImage() && <img src={handleImage()} className={styles.image} />}
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.userDetails}>
          <p>Full name:</p><p>{fullName}</p>
          <p>Username:</p><p>{username}</p>
          <p>Email:</p><p>{email}</p>
        </div>

        <div className={styles.buttonWrapper}>
          <button onClick={logout} className={styles.button} id={styles.logout} type="button">Log out</button>
          <button type="submit" className={styles.button}>Update</button>
          <NavLink to='/sell'><button type="button" className={styles.button}>Sell</button></NavLink>
        </div>
      </div>
    </form>
    </>
  )
}