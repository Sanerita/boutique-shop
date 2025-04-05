import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Helper function for localStorage
const persistAuthState = (userInfo) => {
  if (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } else {
    localStorage.removeItem('userInfo');
  }
};

// Async thunks (keep your existing implementations)
export const login = createAsyncThunk('auth/login', /* ... */);
export const register = createAsyncThunk('auth/register', /* ... */);
export const getUserDetails = createAsyncThunk('auth/getUserDetails', /* ... */);
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', /* ... */);

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.loading = false;
      state.error = null;
      persistAuthState(null);
    },
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      persistAuthState(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // FIRST: Handle all specific cases
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
        state.loading = false;
      });

    // THEN: Add matchers for generic states
    builder
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('auth/') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      );
  },
});

export const { logout, setCredentials, clearError } = authSlice.actions;
export default authSlice.reducer;