import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { items: [], total: 0, restaurant: '' };
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      console.log('Reducer - addToCart', action.payload);
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

      console.log("reducer state", state);
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.restaurant = newItem.restaurant;

      saveCartToStorage(state);
    },
    clearCart: (state) => {
      console.log('Reducer - clearCart');
      state.items = [];
      state.total = 0;
      state.restaurant = '';

      saveCartToStorage(state);
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
