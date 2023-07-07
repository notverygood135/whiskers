import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Personal from './Personal';
import styles from './Navbar.module.css';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineDown, AiOutlineSearch, AiOutlineTags, AiOutlineComment } from "react-icons/ai";
import { LoginContext } from '../../context/LoginContext';

function Navbar() {
  const { isAuth, token, setAuth } = useContext(LoginContext);
  console.log(token);

  return (
    <nav className={styles.container}>
      <div className={styles.logoWrapper}>
        <NavLink to='/'><h1 className={styles.logo}>Whiskers</h1></NavLink>
      </div>
      <ul className={styles.menu}>
        <li className={styles.navItem}>Categories<AiOutlineDown id={styles.categoriesIcon}/></li>
        <li className={styles.navItem}>Deals</li>
        <li className={styles.navItem}>Delivery</li>
        <li className={styles.navItem}>Support</li>
      </ul>
      <div className={styles.searchWrapper}>
        <input type="text" className={styles.searchBar} name="search" placeholder="Search for product, brand, etc."/>
        <button type="submit" className={styles.searchButton}>
          <AiOutlineSearch className={styles.icon} />
        </button>
      </div>

      {/* <LoginContextProvider child = {<Personal />}>
      </LoginContextProvider> */}
      <Personal />

      <ul className={styles.menuMobile}>
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