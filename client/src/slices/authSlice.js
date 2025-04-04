import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Helper function to handle localStorage
const persistAuthState = (userInfo) => {
  if (userInfo) {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } else {
    localStorage.removeItem('userInfo');
  }
};

// Async thunk for user login
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users/login', { email, password });
      persistAuthState(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Login failed'
      );
    }
  }
);

// Async thunk for user registration
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', { name, email, password });
      persistAuthState(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed'
      );
    }
  }
);

// Async thunk for getting user profile
export const getUserDetails = createAsyncThunk(
  'auth/getUserDetails',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${auth.userInfo?.token}`,
        },
      });
      persistAuthState(data);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to get profile'
      );
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { data } = await axios.put(
        '/api/users/profile',
        userData,
        {
          headers: {
            Authorization: `Bearer ${auth.userInfo?.token}`,
          },
        }
      );
      persistAuthState({ ...auth.userInfo, ...data });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Profile update failed'
      );
    }
  }
);

// Initialize state from localStorage
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
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.loading = false;
        }
      )
      
      // Specific cases for actions that update userInfo
      .addCase(login.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userInfo = action.payload;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userInfo = { ...state.userInfo, ...action.payload };
      });
  },
});

export const { logout, setCredentials, clearError } = authSlice.actions;

export default authSlice.reducer;