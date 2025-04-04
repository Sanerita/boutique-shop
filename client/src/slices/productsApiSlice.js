import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/products' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/',
    }),
    getProductDetails: builder.query({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery 
} = productsApiSlice;