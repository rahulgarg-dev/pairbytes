import React from 'react'

import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  return (
    <div className="card">
      <img src={product.image} />
      <h4>{product.title}</h4>
      <p>₹ {product.price}</p>

      <Link to={`/product/${product.id}`}>View Details</Link>

      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;