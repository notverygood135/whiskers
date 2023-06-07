import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineDown, AiOutlineSearch, AiOutlineTags, AiOutlineComment } from "react-icons/ai";

function Navbar() {
  return (
    <nav id={styles.navContainer}>
      <div id={styles.navLogoWrapper}>
        <NavLink to='/'><h1 id={styles.logo}>Whiskers</h1></NavLink>
      </div>
      <ul className={styles.navMenu}>
        <li className={styles.navItem}>Categories<AiOutlineDown id={styles.categoriesIcon}/></li>
        <li className={styles.navItem}>Deals</li>
        <li className={styles.navItem}>Delivery</li>
        <li className={styles.navItem}>Support</li>
      </ul>
      <div id={styles.navSearchWrapper}>
        <input type="text" id={styles.searchBar} name="search" placeholder="Search for product, brand, etc."/>
        <button type="submit" id={styles.searchButton}>
          <AiOutlineSearch className={styles.icon} />
        </button>
      </div>
      <ul className={styles.navMenu}>
        <li className={styles.navItem}>
          Account
          <AiOutlineUser className={styles.icon} />
        </li>
        <li className={styles.navItem}>
          Cart
          <AiOutlineShoppingCart className={styles.icon} />
        </li>
      </ul>
      <ul className={styles.navMenuMobile}>
        <li className={styles.navItem}>
          <AiOutlineTags className={styles.icon} />
          Deals
        </li>
        <li className={styles.navItem}>
          <AiOutlineComment className={styles.icon} />
          Support
        </li>
        <li className={styles.navItem}>
          <AiOutlineUser className={styles.icon} />
          Account
        </li>
        <li className={styles.navItem}>
          <AiOutlineShoppingCart className={styles.icon} />
          Cart
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;