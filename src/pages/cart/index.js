import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../redux/reducers/cartreducer';

export const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  console.log(cart);

  const handleClearToCart = () => {
    dispatch(clearCart());
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.items.map(item => (
        <div key={item.id}>
          <p>{item.foodName}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.price}</p>
        </div>
      ))}
      <p>Total: ${cart.total}</p>
      <p>Restaurant: {cart.restaurant}</p>
      <div onClick={handleClearToCart}>
        clear cart
      </div>
    </div>
  );
};

