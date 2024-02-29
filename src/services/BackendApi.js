import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tradesApi = createApi({
    reducerPath: 'tradesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000' }),
    endpoints: (builder) => ({
      getTrades: builder.query({
        query: () => 'backend/trades/list',
      }),
      getKeyMetrics: builder.query({
        query: () => 'backend/trades/key-metrics',
      }),
      getDoughnutData: builder.query({
        query: () => 'backend/trades/pie-chart-data',
      }),
    }),
  });
  
  export const { useGetTradesQuery, useGetKeyMetricsQuery, useGetDoughnutDataQuery } = tradesApi;