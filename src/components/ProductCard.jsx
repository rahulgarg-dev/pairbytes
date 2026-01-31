// import React from 'react';
// import { Link } from "react-router-dom";

// function ProductCard({ product, addToCart }) {
//   return (
//     <div className="card">
//       <img src={product.image} />
//       <h4>{product.title}</h4>
//       <p>₹ {product.price}</p>

//       <Link to={`/product/${product.id}`}>View Details</Link>

//       <button onClick={() => addToCart(product)}>Add to Cart</button>
//     </div>
//   );
// }

// export default ProductCard;

import React from "react";
import { Link } from "react-router-dom";

function ProductCard({
  product,
  cart,
  addToCart,
  increaseQty,
  decreaseQty,
}) {
  // Check if product already in cart
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title}</h4>
      <p>₹ {product.price}</p>

      <Link to={`/product/${product.id}`} className="details-link">
        View Details
      </Link>

      {/* CART ACTIONS */}
      {!cartItem ? (
        <button onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      ) : (
        <div className="qty-controls">
          <button onClick={() => decreaseQty(product.id)}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={() => increaseQty(product.id)}>+</button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;