import { configureStore } from '@reduxjs/toolkit';
import { usersApiSlice } from './slices/usersApiSlice';
import { productsApiSlice } from './slices/productsApiSlice';
import { ordersApiSlice } from './slices/ordersApiSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    [productsApiSlice.reducerPath]: productsApiSlice.reducer,
    [ordersApiSlice.reducerPath]: ordersApiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApiSlice.middleware,
      productsApiSlice.middleware,
      ordersApiSlice.middleware
    ),
  devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;