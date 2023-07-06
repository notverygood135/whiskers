import LoginContextProvider from '../../context/LoginContext';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineDown, AiOutlineSearch, AiOutlineTags, AiOutlineComment, AiOutlineLogin, AiOutlineForm } from "react-icons/ai";

function Navbar() {

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

      {/* <ul className={styles.menu}>
        <NavLink to='/login' className={styles.navItem}>
          <li className={styles.navItem}>
            Login 
            <AiOutlineLogin className={styles.icon} />
          </li>
        </NavLink>
        <li className={styles.navItem}>
          Register
          <AiOutlineForm className={styles.icon} />
        </li>
      </ul> */}

      <LoginContextProvider child={(
        <ul className={styles.menu}>
          <li>
            <NavLink to='/login' className={styles.navItem}>
              Login 
              <AiOutlineLogin className={styles.icon} />
            </NavLink>
          </li>
          <li>
            <NavLink to='/register' className={styles.navItem}>
              Register
              <AiOutlineForm className={styles.icon} />
            </NavLink> 
          </li>
        </ul>
      )} />
      
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