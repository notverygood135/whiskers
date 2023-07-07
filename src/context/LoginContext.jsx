import { useState, useEffect, createContext } from "react";

const LoginContext = createContext({
    isAuth: false,
    token: '',
    setAuth: () => {}
});

const LoginProvider = ({ child }) => {
  const [isAuth, setAuth] = useState(localStorage.getItem('isAuth') == 'true' || false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  useEffect(() => {
    localStorage.setItem('isAuth', isAuth);
    localStorage.setItem('token', token)
  }, [isAuth]);
  return (
    <LoginContext.Provider value={{isAuth, token, setAuth, setToken}}>
      {child}
    </LoginContext.Provider>
  )
}

export default LoginProvider;
export { LoginContext };