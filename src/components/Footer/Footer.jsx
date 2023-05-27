import { useState } from 'react'
import styles from './Footer.module.css'
import visaLogo from '../../assets/footer/Visa_2021.svg'
import mastercardLogo from '../../assets/footer/Mastercard_2019_logo.svg'
import paypalLogo from '../../assets/footer/PayPal_Logo_Icon_2014.svg'

function Footer() {
  return (
    <footer id={styles.footerContainer}>
      <div>
        <h3>Categories</h3>
        <ul className={styles.footerList}>
          <li className={styles.footerListItem}>Food</li>
          <li className={styles.footerListItem}>Treats</li>
          <li className={styles.footerListItem}>Litter</li>
          <li className={styles.footerListItem}>Toys</li>
          <li className={styles.footerListItem}>Health Supplies</li>
          <li className={styles.footerListItem}>Beds</li>
          <li className={styles.footerListItem}>Bowls & Feeders</li>
          <li className={styles.footerListItem}>Scratcher & Trees</li>
          <li className={styles.footerListItem}>Grooming</li>
        </ul>
      </div>
      <div>
        <h3>About</h3>
        <ul className={styles.footerList}>
          <li className={styles.footerListItem}>About Us</li>
          <li className={styles.footerListItem}>News & Blog</li>
          <li className={styles.footerListItem}>Careers</li>
          <li className={styles.footerListItem}>Terms & Conditions</li>
          <li className={styles.footerListItem}>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <h3>Payment</h3>
        <ul className={styles.footerList}>
          <li className={styles.footerLogoWrapper}><img src={visaLogo} alt="Visa" className={styles.footerLogo}/></li>
          <li className={styles.footerLogoWrapper}><img src={mastercardLogo} alt="MasterCard" className={styles.footerLogo}/></li>
          <li className={styles.footerLogoWrapper}><img src={paypalLogo} alt="PayPal" className={styles.footerLogo}/></li>
        </ul>
      </div>
      <div>
        <h3>Contact</h3>
        <ul className={styles.footerList}>
          <li className={styles.footerListItem}>Facebook</li>
          <li className={styles.footerListItem}>Twitter</li>
          <li className={styles.footerListItem}>LinkedIn</li>
          <li className={styles.footerListItem}>E-mail</li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer