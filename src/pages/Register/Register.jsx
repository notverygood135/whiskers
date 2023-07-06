import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = data => {
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log(response.text());
      navigate('/');
    })
  };

  return (
    <>
    <div className={styles.container}>
      <img src="/vecteezy_russian-blue-kitty-with-monochrome-wall-background_2410697.jpg" alt="russian blue cat" className={styles.image}/>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Sign up</h2>
            <input placeholder="E-mail" className={styles.formField} {...register('email', { required: true })} />
            <input placeholder="Username" className={styles.formField} {...register('username', { required: true })} />
            <input placeholder="Password" className={styles.formField} {...register('password', { required: true })} />
            <input placeholder="Confirm Password" className={styles.formField} {...register('confirmpassword', { required: true })} />
            <button className={styles.button} id={styles.signInButton} type='submit'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}