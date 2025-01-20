import { createSlice } from '@reduxjs/toolkit';
import { addItemToCart, removeItemFromCart } from './cart.utils';
import { signOutStart } from '../user/user.reducer';

const initialState = {
  hidden: true,
  cartItems: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartHidden: (state) => {
      state.hidden = !state.hidden;
    },
    addItem: (state, action) => {
      state.cartItems = addItemToCart(state.cartItems, action.payload);
    },
    removeItem: (state, action) => {
      state.cartItems = removeItemFromCart(state.cartItems, action.payload);
    },
    clearItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        cartItem => cartItem.id !== action.payload.id
      );
    },
    clearCart(state) {
      state.cartItems = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Clear cart when user signs out
      .addCase(signOutStart.fulfilled, (state) => {
        state.cartItems = [];
        state.hidden = true;
      });
  }
});

export const {
  toggleCartHidden,
  addItem,
  removeItem,
  clearItemFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;