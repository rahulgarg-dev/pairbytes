import React from 'react'
import ProductCard from "./ProductCard";

function ProductList({ products, addToCart }) {
  return (
    <div className="products">
      {products.map(p => (
        <ProductCard key={p.id} product={p} addToCart={addToCart} />
      ))}
    </div>
  );
}


export default ProductList;