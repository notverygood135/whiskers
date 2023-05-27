import styles from './Hero.module.css'

function Hero() {
  return (
    <section id={styles.heroContainer}>
      <div id={styles.heroTextWrapper}>
        <h1 id={styles.heroText}>The best<br/>for our furry friends</h1>
        <button id={styles.heroButton}>Learn more</button>
      </div>
      <div id={styles.heroImageWrapper}>
        <img 
          src="/vecteezy_black-and-white-cat-close-up_2412790.jpg" 
          alt="Cat sleeping" 
          className={styles.heroImage}
        />
        <img 
          src="/vecteezy_close-up-of-cat-s-face_2410885.jpg" 
          alt="Cat sleeping" 
          className={styles.heroImage}
          id={styles.heroImageMobile}
        />
      </div>
    </section>
  )
}

export default Hero