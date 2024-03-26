import { configureStore } from '@reduxjs/toolkit';
import { tradesApi } from '../services/BackendApi';
import importReducer from '../services/BackendApi';
import authReducer from '../services/authSlice';

export const store = configureStore({
  reducer: {
    [tradesApi.reducerPath]: tradesApi.reducer,
    import: importReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tradesApi.middleware),
    
});

export default store;