import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

export default function Cart() {
    const { isAuth, token, setAuth, setToken } = useContext(LoginContext);
    const navigate = useNavigate();
    function logout() {
        setAuth(false);
        setToken('');
        navigate('/');
    }

    return (
        <button onClick={logout}>Log out</button>
    )
}