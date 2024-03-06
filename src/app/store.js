import { configureStore } from '@reduxjs/toolkit';
import { tradesApi } from '../services/BackendApi';
import importReducer from '../services/BackendApi';

export const store = configureStore({
  reducer: {
    [tradesApi.reducerPath]: tradesApi.reducer,
    import: importReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tradesApi.middleware),
    
});

export default store;