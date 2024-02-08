import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../../redux/reducers/cartreducer';
import "./index.css";

export const CartPage = ({ isPopUp }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const handleClearToCart = () => {
    dispatch(clearCart());
  }

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleDecrementQuantity = (itemId) => {
    dispatch(updateQuantity({ itemId, increment: false }));
  };

  const handleIncrementQuantity = (itemId) => {
    dispatch(updateQuantity({ itemId, increment: true }));
  };

  return (
    <div className='cart-container'>
      <h2>Your Cart</h2>
      <div className='cart-items'>
        {cart.items.map(item => (
          <div key={item.id}>
            <p>{item.foodName}</p>
            <div className='cart-quantity-action'>
            <button onClick={() => handleDecrementQuantity(item.id)}>-</button>
            <p>{item.quantity}</p>
            <button onClick={() => handleIncrementQuantity(item.id)}>+</button>
            </div>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        ))}
      </div>
      <p>Total: ${cart.total}</p>
      <p>Restaurant: {cart.items.length>0 ? cart.restaurant : ""}</p>
      <div onClick={handleClearToCart}>
        clear cart
      </div>
    </div>
  );
};

