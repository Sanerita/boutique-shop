import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating an order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/orders', order);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Order creation failed'
      );
    }
  }
);

// Async thunk for getting order details
export const getOrderDetails = createAsyncThunk(
  'orders/getOrderDetails',
  async (orderId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Order not found'
      );
    }
  }
);

// Async thunk for paying an order
export const payOrder = createAsyncThunk(
  'orders/payOrder',
  async ({ orderId, details }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/pay`, details);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Payment failed'
      );
    }
  }
);

const initialState = {
  order: null,
  loading: false,
  error: null,
  successPay: false,
  loadingPay: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
      state.successPay = false;
      state.loadingPay = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get Order Details
      .addCase(getOrderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Pay Order
      .addCase(payOrder.pending, (state) => {
        state.loadingPay = true;
      })
      .addCase(payOrder.fulfilled, (state, action) => {
        state.loadingPay = false;
        state.successPay = true;
        state.order = action.payload;
      })
      .addCase(payOrder.rejected, (state, action) => {
        state.loadingPay = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = ordersSlice.actions;

export default ordersSlice.reducer;