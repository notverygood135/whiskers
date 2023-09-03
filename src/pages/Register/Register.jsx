import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const onSubmit = data => {
    console.log(data);
    if (data.password == data.confirmPassword) {
      fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        return(response.text());
      })
      .then(data => {
        console.log(data);
        navigate('/login')
      })
      .catch(error => {
        console.log(error);
      })
    }
    else {
      console.log('le epic trollge');
    }
  };

  return (
    <>
    <div className={styles.container}>
      <img src="/vecteezy_russian-blue-kitty-with-monochrome-wall-background_2410697.jpg" alt="russian blue cat" className={styles.image}/>
      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2>Sign up</h2>
            <div className={styles.name}>
              <input type='text' placeholder="First Name" className={styles.formField} id={styles.nameField} {...register('first_name', { required: true })} />
              <input type='text' placeholder="Last Name" className={styles.formField} id={styles.nameField} {...register('last_name', { required: true })} />
            </div>
            <input type='text' placeholder="Username" className={styles.formField} {...register('username', { required: true })} />
            <input type='text' placeholder="Password" className={styles.formField} {...register('password', { required: true })} />
            <input type='text' placeholder="Confirm Password" className={styles.formField} {...register('confirmPassword', { required: true })} />
            <input type='text' placeholder="E-mail" className={styles.formField} {...register('email', { required: true })} />
            <button className={styles.button} id={styles.signInButton} type='submit'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}