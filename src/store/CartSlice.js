import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find(i => i._id === item._id);
      if (exist) {
        exist.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Optional: Remove if quantity is 1
        state.cartItems = state.cartItems.filter(i => i._id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
