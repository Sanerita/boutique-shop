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
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '',
      providesTags: ['Order'],
    }),
    getOrderDetails: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Order', id }],
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: '',
        method: 'POST',
        body: order,
      }),
      invalidatesTags: ['Order'],
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `/${orderId}/pay`,
        method: 'PUT',
        body: details,
      }),
      invalidatesTags: (result, error, { orderId }) => [{ type: 'Order', id: orderId }],
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `/${orderId}/deliver`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, orderId) => [{ type: 'Order', id: orderId }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useDeliverOrderMutation,
} = ordersApiSlice;