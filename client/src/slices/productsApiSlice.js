import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/products' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword = '', pageNumber = '' }) => 
        `/?keyword=${keyword}&pageNumber=${pageNumber}`,
      providesTags: ['Product'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (productId) => `/${productId}`,
      providesTags: (result, error, productId) => [{ type: 'Product', id: productId }],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/${data.productId}`,
        method: 'PUT',
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
        },
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: '/upload',
        method: 'POST',
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
        },
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/${productId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
        },
      }),
      invalidatesTags: ['Product'],
    }),
    createProductReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `/${productId}/reviews`,
        method: 'POST',
        body: review,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')?.token}`,
        },
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Product', id: productId }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateProductReviewMutation,
} = productsApiSlice;