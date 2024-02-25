import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : { items: [], total: 0, restaurant: '', image: '' };
};

const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id);

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      state.restaurant = newItem.restaurant;
      state.image = newItem.image

      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { itemId, increment } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
    
      if (itemIndex !== -1) {
        const updatedItems = [...state.items]; // Create a copy of the items array
        const updatedItem = { ...updatedItems[itemIndex] }; // Create a copy of the item to update
    
        if (increment) {
          updatedItem.quantity += 1;
        } else {
          updatedItem.quantity -= 1;
          if (updatedItem.quantity < 1) {
            updatedItems.splice(itemIndex, 1);
          }
        }
    
        updatedItems[itemIndex] = updatedItem; // Update the item in the copied array
        state.items = updatedItems; // Update the state with the new array of items
      }
    
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== itemIdToRemove);
      state.total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.restaurant = '';
      state.image = '';

      saveCartToStorage(state);
    },
  },
});

export const { addToCart, clearCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
