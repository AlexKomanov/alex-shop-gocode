import "./App.css";
import Header from "../header-component/Header";
import Products from "../products-component/Products";
import { useState, useEffect } from "react";
import Spinner from "../spinnet-component/Spinner";
import { CartContext } from "../../Context/CartContext";
import { Container } from "@material-ui/core";

function App() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [categories, setCategories] = useState([]);

  function handlerFilter(filterName, price) {
    if (filterName === "" || filterName === "all") {
      setFilterProducts(
        products.filter((product) => {
          return product.price > price[0] && product.price < price[1];
        })
      );
    } else {
      setFilterProducts(
        products.filter((product) => {
          return (
            product.price > price[0] &&
            product.price < price[1] &&
            product.category === filterName
          );
        })
      );
    }
  }

  useEffect(() => {
    setSpinner((prev) => !prev);
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilterProducts(data);
        setSpinner((prev) => !prev);
      });
  }, []);

  useEffect(() => {
    setCategories([
      "all",
      ...products
        .map((p) => p.category)
        .filter((value, index, array) => array.indexOf(value) === index),
    ]);
  }, [products]);

  return (
    <CartContext>
      <Container fixed>
        <Header categories={categories} handlerFilter={handlerFilter} />
        {spinner ? <Spinner /> : <Products products={filterProducts} />}
      </Container>
    </CartContext>
  );
}

export default App;
