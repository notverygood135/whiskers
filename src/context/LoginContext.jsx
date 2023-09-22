import { useState, useEffect, createContext } from "react";

const LoginContext = createContext({
    userId: '',
    setUserId: () => {}
});

const LoginProvider = ({ child }) => {
  const localUserId = localStorage.getItem('userId') != '' ? localStorage.getItem('userId') : '';
  const [userId, setUserId] = useState(localUserId);
  useEffect(() => {
    localStorage.setItem('userId', userId);
  }, [userId]);
  return (
    <LoginContext.Provider value={{userId, setUserId}}>
      {child}
    </LoginContext.Provider>
  )
}

export default LoginProvider;
export { LoginContext };