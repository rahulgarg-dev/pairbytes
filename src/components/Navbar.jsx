import React from 'react'

function Navbar({ cartCount }) {
  return (
    <div className="navbar">
      <h2>Mini E-Commerce</h2>
      <p>Cart: {cartCount}</p>
    </div>
  );
}

export default Navbar;
