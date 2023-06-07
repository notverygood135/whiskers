import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Footer from './components/Footer/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/product/:name" exact element={<Product />} />
          <Route component={Error} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
