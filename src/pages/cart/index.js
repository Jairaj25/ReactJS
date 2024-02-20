import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../../redux/reducers/cartreducer';
import closeCircle from "../../assets/close-icon.svg"
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
      <div className='cart-title'>
        <h2>Your Cart</h2>
      </div>
      <div className='cart-items'>
        {cart.items.length > 1 ? (<div className='cart-card table-titles'>
          <p className='cart-card-name'>Name</p>
          <p className='cart-card-price'>Price</p>
          <div className='cart-quantity-action-wrapper'>
            <p className='cart-card-quantity'>Quantity</p>
          </div>
          <div className='cart-remove-btn'>Total</div>
        </div>) : (null)}
        {cart.items.map(item => (
          <div className='cart-card' key={item.id}>
            <p className='cart-card-name'>{item.foodName}</p>
            <p className='cart-card-price'>${item.price}</p>
            <div className='cart-quantity-action-wrapper'>
              <div className='cart-quantity-action'>
                <button className='cart-decrement-btn' onClick={() => handleDecrementQuantity(item.id)}>-</button>
                <p className='cart-card-quantity'>{item.quantity}</p>
                <button className='cart-increment-btn' onClick={() => handleIncrementQuantity(item.id)}>+</button>
              </div>
            </div>
            <div className='total-action-wrapper'>
              <div className='cart-card-total'>${(item.price * item.quantity).toFixed(2)}</div>
              <button className='cart-remove-btn' onClick={() => handleRemoveFromCart(item.id)}>
                <img src={closeCircle} alt="close button" width={18} height={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='cart-actions'>
        <div className='cart-total-price-wrapper'>
          <p>Sub Total:</p>
          <p className='cart-total-price'>${cart.total}</p>
        </div>
        <div className='cart-restaurant-wrapper'>
          <p>Restaurant:</p>
          <p className='cart-restaurant'> {cart.items.length > 0 ? cart.restaurant : ""}</p>
        </div>
        <div className='clear-cart' onClick={handleClearToCart}>
          Clear Cart
        </div>
      </div>
    </div>
  );
};

