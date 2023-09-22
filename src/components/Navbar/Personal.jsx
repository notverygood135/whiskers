import styles from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineLogin, AiOutlineForm } from "react-icons/ai";
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';

export default function Personal() {
  const { userId } = useContext(LoginContext);
  console.log(userId)
  return (
    !userId ?
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
    </ul> :
    <ul className={styles.menu}>
    <li>
      <NavLink to='/account' className={styles.navItem}>
        Account 
        <AiOutlineUser className={styles.icon} />
      </NavLink>
    </li>
    <li className={styles.navItem}>
      <NavLink to='/cart' className={styles.navItem}>
        Cart
        <AiOutlineShoppingCart className={styles.icon} />
      </NavLink>
    </li>
  </ul>
  );
}