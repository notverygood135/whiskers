import { useState, useEffect, createContext } from "react";

const LoginContext = createContext({
    session: '',
    setSession: () => {},
    userId: '',
    setUserId: () => {}
});

const LoginProvider = ({ child }) => {
  const localSession = localStorage.getItem('session') != '' ? localStorage.getItem('session') : '';
  const localUserId = localStorage.getItem('userId') != '' ? localStorage.getItem('userId') : '';
  const [session, setSession] = useState(localSession);
  const [userId, setUserId] = useState(localUserId);
  useEffect(() => {
    localStorage.setItem('session', session);
    localStorage.setItem('userId', userId);
  }, [session]);
  return (
    <LoginContext.Provider value={{session, setSession, userId, setUserId}}>
      {child}
    </LoginContext.Provider>
  )
}

export default LoginProvider;
export { LoginContext };