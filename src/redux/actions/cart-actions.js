export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';

export const addToCart = (item) => {
    console.log('Action - addToCart', item);
  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
