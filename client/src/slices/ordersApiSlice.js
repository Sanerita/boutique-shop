import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ordersApiSlice = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/orders',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: '/',
        method: 'POST',
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { 
  useCreateOrderMutation, 
  useGetOrderDetailsQuery 
} = ordersApiSlice;