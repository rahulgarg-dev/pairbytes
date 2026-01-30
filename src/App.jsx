import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => setError("Failed to load products"));
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  // Load cart
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart"));
    if (saved) setCart(saved);
  }, []);

  // Save cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exist = cart.find(i => i.id === product.id);
    if (exist) {
      setCart(cart.map(i =>
        i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const filterCategory = (cat) => {
    if (cat === "all") setFiltered(products);
    else setFiltered(products.filter(p => p.category === cat));
  };

  const sortPrice = (type) => {
    const sorted = [...filtered].sort((a, b) =>
      type === "low" ? a.price - b.price : b.price - a.price
    );
    setFiltered(sorted);
  };

  return (
    <>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Filters
                categories={categories}
                onFilter={filterCategory}
                onSort={sortPrice}
              />

              {loading && <p>Loading...</p>}
              {error && <p>{error}</p>}

              <ProductList products={filtered} addToCart={addToCart} />
              <Cart cart={cart} />
            </>
          }
        />

        <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
      </Routes>
    </>
  );
}

export default App;