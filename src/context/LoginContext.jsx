import { useState, useEffect, createContext } from "react";

const LoginContext = createContext({
    isAuth: false,
    token: '',
    setAuth: () => {}
});

const LoginContextProvider = ({ child }) => {
  const [isAuth, setAuth] = useState(localStorage.getItem('isAuth') == 'true' || false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    localStorage.setItem('isAuth', isAuth)
  }, [isAuth]);
  console.log(isAuth);
  return (
    <LoginContext.Provider value={{isAuth, token, setAuth}}>
      {child}
    </LoginContext.Provider>
  )
}

export default LoginContextProvider;