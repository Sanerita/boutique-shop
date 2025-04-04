import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (order, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/orders', order);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'An error occurred'
      );
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;