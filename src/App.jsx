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
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add to cart
  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  //  Increase quantity
  const increaseQty = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  //  Decrease quantity
  const decreaseQty = (productId) => {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const filterCategory = (cat) => {
    if (cat === "all") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === cat));
    }
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

              {loading && (
                <p style={{ padding: "10px" }}>Loading products...</p>
              )}
              {error && (
                <p style={{ padding: "10px", color: "red" }}>{error}</p>
              )}

              <div className="main-layout">
                <ProductList
                  products={filtered}
                  cart={cart}
                  addToCart={addToCart}
                  increaseQty={increaseQty}
                  decreaseQty={decreaseQty}
                />
                <Cart cart={cart} />
              </div>
            </>
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
      </Routes>
    </>
  );
}

export default App;