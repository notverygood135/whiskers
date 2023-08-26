import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { NavLink, useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const { isAuth, setAuth } = useContext(LoginContext);
  
  function logout() {
    fetch('http://localhost:3001/auth/logout', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => {
      console.log(response.text());
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
    })
    setAuth(false);
  }

  return (
    <>
      <button onClick={logout}>Log out</button>
      <NavLink to='/sell'><button>Sell</button></NavLink>
    </>
  )
}