import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react';

export const tradesApi = createApi({
  reducerPath: 'tradesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000',
    prepareHeaders: (headers, { getState }) => {
      // Get the token from your state or wherever you store it
      const token = localStorage.getItem('token');

      // If a token exists, include it in the headers
      if (token) {
        
        headers.set('Authorization', `Token ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTrades: builder.query({
      query: (accountId) => `backend/trades/list/${accountId}`,
    }),
    getKeyMetrics: builder.query({
      query: ({ timeRange, accountId }) => `backend/trades/key-metrics/${timeRange}/${accountId}`,
    }),
    getAccountProgress: builder.query({
      query: ({ timeRange, accountId }) => `backend/trades/progress/${timeRange}/${accountId}`,
    }),
    getDoughnutData: builder.query({
      query: ({ timeRange, accountId }) => `backend/trades/pie-chart-data/${timeRange}/${accountId}`,
    }),
    getBarChartData: builder.query({
      query: ({ timeRange, accountId }) => `backend/trades/bar-chart/${timeRange}/${accountId}`,
    }),
    getSemiDoughnutData: builder.query({
      query: ({ timeRange, accountId }) => `backend/trades/win-rate/${timeRange}/${accountId}`,
    }),
    getAccountList: builder.query({
      query: () => `backend/trades/accounts`,
    }),
  }),
 });
export const { useGetTradesQuery, useGetKeyMetricsQuery, useGetDoughnutDataQuery, useGetAccountProgressQuery, useGetSemiDoughnutDataQuery , useGetBarChartDataQuery,useGetJournalListQuery, useGetAccountListQuery} = tradesApi;


export const importData = createAsyncThunk(
  'import/importData',
  async (payload) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://127.0.0.1:8000/backend/connect_to_mt5/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred. Please try again.');
    }
  }
);

const importSlice = createSlice({
  name: 'import',
  initialState: {
     importStatus: '',
     loading: false,
     error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
     builder
       .addCase(importData.pending, (state) => {
         state.loading = true;
         state.error = null;
       })
       .addCase(importData.fulfilled, (state, action) => {
         state.loading = false;
         state.importStatus = action.payload;
       })
       .addCase(importData.rejected, (state, action) => {
         state.loading = false;
         state.error = action.error.message;
       });
  },
 });

export default importSlice.reducer;

