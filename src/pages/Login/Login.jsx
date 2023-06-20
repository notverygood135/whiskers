import { useForm } from "react-hook-form";
import styles from './Login.module.css';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
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
    })
  };

  return (
    <>
    <div className={styles.container}>
      <img src="/vecteezy_russian-blue-kitty-with-monochrome-wall-background_2410697.jpg" alt="russian blue cat" className={styles.image}/>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Log in</h2>
            <input placeholder="Username" className={styles.formField} {...register('username', { required: true })} />
            <input placeholder="Password" className={styles.formField} {...register('password', { required: true })} />
            <button className={styles.button} id={styles.signInButton} type='submit'>Login</button>
          </form>
          <div className={styles.signUp}>
            <h4>New to Whiskers?</h4>
            <button className={styles.button} id={styles.signUpButton}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}