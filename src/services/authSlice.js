import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { signupStart, signupSuccess, signupFailure } = authSlice.actions;



export default authSlice.reducer;



  
