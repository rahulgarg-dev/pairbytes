import React from 'react'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details">
      <img src={product.image} width="200" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>₹ {product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetails;