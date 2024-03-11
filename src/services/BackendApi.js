import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery  } from '@reduxjs/toolkit/query/react';

export const tradesApi = createApi({
  reducerPath: 'tradesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
  endpoints: (builder) => ({
     getTrades: builder.query({
       query: () => `backend/trades/list`,
     }),
     getKeyMetrics: builder.query({
       query: () => `backend/trades/key-metrics`,
     }),
     getAccountProgress: builder.query({
       query: (timeRange) => `backend/trades/progress/${timeRange}`,
     }),
     getDoughnutData: builder.query({
       query: (timeRange) => `backend/trades/pie-chart-data/${timeRange}`,
     }),
     getBarChartData: builder.query({
       query: (timeRange) => `backend/trades/bar-chart/${timeRange}`,
     }),
     getSemiDoughnutData: builder.query({
       query: (timeRange) => `backend/trades/win-rate/${timeRange}`,
     }),
  }),
 });
export const { useGetTradesQuery, useGetKeyMetricsQuery, useGetDoughnutDataQuery, useGetAccountProgressQuery, useGetSemiDoughnutDataQuery , useGetBarChartDataQuery} = tradesApi;


export const importData = createAsyncThunk(
  'import/importData',
  async (payload) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/backend/connect_to_mt5/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': 'your_csrf_token_here',
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