import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import Personal from './Personal';
import styles from './Navbar.module.css';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineDown, AiOutlineSearch, AiOutlineTags, AiOutlineComment } from "react-icons/ai";

function Navbar() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate()  

  function onSubmit(data) {
    const search = data.search;
    const url = search ? `/shop/?search=${search}` : `/shop`;
    navigate(url);
    // console.log(url)
  }

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
      <form className={styles.searchWrapper} onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="text" 
          id={styles.searchBar} 
          name="search" 
          placeholder="Search for product, brand, etc."
          {...register('search')}
        />
        <button type="submit" className={styles.searchButton}>
          <AiOutlineSearch className={styles.icon} />
        </button>
      </form>
      
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