import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from './slices/usersApiSlice';
import { productsApiSlice } from './slices/productsApiSlice';
import { ordersApiSlice } from './slices/ordersApiSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import { loadAuthState, loadCartState } from './localStorage';

// Load persisted states
const preloadedState = {
  auth: { userInfo: loadAuthState() },
  cart: loadCartState() || {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0
  }
};

const store = configureStore({
  reducer: {
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disabled for localStorage handling
    }).concat(
      usersApiSlice.middleware,
      productsApiSlice.middleware,
      ordersApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

// Subscribe to store changes for persistence
store.subscribe(() => {
  const state = store.getState();
  // Persist only necessary data
  const { userInfo } = state.auth;
  const { cartItems, shippingAddress, paymentMethod } = state.cart;
  
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
  localStorage.setItem('cart', JSON.stringify({
    cartItems,
    shippingAddress,
    paymentMethod
  }));
});

export default store;