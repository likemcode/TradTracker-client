import { configureStore } from '@reduxjs/toolkit';
import { tradesApi } from '../services/BackendApi';

export const store = configureStore({
  reducer: {
    [tradesApi.reducerPath]: tradesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tradesApi.middleware),
});

export default store;