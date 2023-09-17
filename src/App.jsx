import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import LoginProvider from './context/LoginContext';
import Account from './pages/Account/Account';
import Shop from './pages/Shop/Shop';
import Sell from './pages/Sell/Sell';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Success from './pages/Checkout/Success';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const localSession = localStorage.getItem('session');
    const localUserId = localStorage.getItem('userId');
    fetch('http://localhost:3001/auth/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ localSession, localUserId }),
      credentials: 'include'
    })
    .then(response => {
      console.log(response.text());
    })
    .catch(error => {
      console.log(error);
    })
  }, []);

  return (
    <BrowserRouter>
    <LoginProvider child = {(
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:name" exact element={<Product />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/sell" exact element={<Sell />} />
          <Route path="/cart" exact element={<Cart />} />
          <Route path="/checkout" exact element={<Checkout />} />
          <Route path="/success" exact element={<Success />} />
          <Route component={Error} />
        </Routes>
        <Footer />
      </div>)}
    />
    </BrowserRouter>
  )
}

export default App
