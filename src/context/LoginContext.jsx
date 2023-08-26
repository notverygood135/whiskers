import { useState, useEffect, createContext } from "react";

const LoginContext = createContext({
    isAuth: false,
    setAuth: () => {}
});

const LoginProvider = ({ child }) => {
  const [isAuth, setAuth] = useState(localStorage.getItem('isAuth') == 'true' || false);
  useEffect(() => {
    localStorage.setItem('isAuth', isAuth);
  }, [isAuth]);
  return (
    <LoginContext.Provider value={{isAuth, setAuth}}>
      {child}
    </LoginContext.Provider>
  )
}

export default LoginProvider;
export { LoginContext };