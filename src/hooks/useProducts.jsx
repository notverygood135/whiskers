import { useState, useEffect } from "react";
import useFetch from "./useFetch.jsx";
import ProductItem from "../components/ProductItem/ProductItem.jsx";

function useProducts() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    fetch('http://localhost:3000/products')
    .then(response => {
      return response.text();
    })
  }

  setProducts(fetchProducts());
  console.log(products);
  return products;
}

export default useProducts;