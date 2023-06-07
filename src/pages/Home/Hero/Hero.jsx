import styles from './Hero.module.css'

function Hero() {
  return (
    <section id={styles.container}>
      <div id={styles.textWrapper}>
        <h1 id={styles.text}>The best<br/>for our furry friends</h1>
        <button id={styles.button}>Learn more</button>
      </div>
      <div id={styles.imageWrapper}>
        <img 
          src="/vecteezy_black-and-white-cat-close-up_2412790.jpg" 
          alt="Cat sleeping" 
          className={styles.image}
        />
        <img 
          src="/vecteezy_close-up-of-cat-s-face_2410885.jpg" 
          alt="Cat sleeping" 
          className={styles.image}
          id={styles.imageMobile}
        />
      </div>
    </section>
  )
}

export default Hero