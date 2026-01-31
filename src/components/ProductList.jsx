// import React from 'react'
// import ProductCard from "./ProductCard";

// function ProductList({ products, addToCart }) {
//   return (
//     <div className="products">
//       {products.map(p => (
//         <ProductCard key={p.id} product={p} addToCart={addToCart} />
//       ))}
//     </div>
//   );
// }


// export default ProductList;

import React from "react";
import ProductCard from "./ProductCard";

function ProductList({
  products,
  cart,
  addToCart,
  increaseQty,
  decreaseQty,
}) {
  return (
    <div className="products">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          cart={cart}
          addToCart={addToCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
        />
      ))}
    </div>
  );
}

export default ProductList;