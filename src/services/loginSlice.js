import { createSlice } from '@reduxjs/toolkit';


export const loginSlice = createSlice({
    name: 'login',
    initialState: {
      token: null,
      error: null,
      loading: false,
    },
    reducers: {
      loginStart: (state) => {
        state.loading = true;
        state.error = null;
      },
      loginSuccess: (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      },
      loginFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      },
    },
  });
  
export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;

export default loginSlice.reducer;