import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApiSlice = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/users',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.userInfo?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserDetails: builder.query({
      query: () => '/profile',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: '/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query({
      query: () => '',
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    getUserById: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/${userId}`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'User', id: userId }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} = usersApiSlice;