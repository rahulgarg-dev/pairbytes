import React from 'react'

function Cart({ cart }) {
  return (
    <div className="cart">
      <h3>Cart</h3>
      {cart.length === 0 && <p>Cart is empty</p>}
      {cart.map(item => (
        <p key={item.id}>
          {item.title} — Qty: {item.quantity}
        </p>
      ))}
    </div>
  );
}

export default Cart;