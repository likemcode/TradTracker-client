import React, { useState, useEffect } from 'react';
import { DatePicker, Empty } from 'antd';
import { useGetTradesQuery } from '../services/BackendApi';
import CustomEmpty from './CustomEmpty';
import Loader from './Loader';

const { RangePicker } = DatePicker;

const History = ({ selectedAccount }) => {
  const { data: trades, isLoading, error } = useGetTradesQuery(selectedAccount);
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    if (trades) {
      setFilteredData(trades);
    }
  }, [trades]);

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-4xl font-bold text-red-500 mb-4">500</div>
        <div className="text-xl mb-8">{error.error}</div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Back Home
        </button>
      </div>
    );
  }

  const handleDateFilter = (dates) => {
    setDateRange(dates);
    if (dates && dates[0] && dates[1]) {
      const filteredTrades = trades.filter(
        (trade) =>
          new Date(trade.dates) >= dates[0].startOf('day') &&
          new Date(trade.dates) <= dates[1].endOf('day')
      );
      setFilteredData(filteredTrades);
      setCurrentPage(1);
    } else {
      setFilteredData(trades);
    }
  };

  const renderTag = (text, record) => {
    let tagColor = 'bg-blue-500';
    let tagText = 'Buy';

    if (record.profit >= 0 && text !== '0' && text !== '1') {
      tagColor = 'bg-green-500';
      tagText = 'Deposit';
    } else if (record.profit < 0 && text !== '0' && text !== '1') {
      tagColor = 'bg-red-500';
      tagText = 'Withdrawal';
    } else if (text === '0') {
      tagColor = 'bg-red-500';
      tagText = 'Sell';
    }

    return (
      <span className={`${tagColor} text-white text-xs font-medium px-2.5 py-0.5 rounded`}>
        {tagText}
      </span>
    );
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const renderPagination = () => (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md">
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Next
      </button>
    </div>
  );

  const renderContent = () => {
    if (!paginatedData || paginatedData.length === 0) {
      if (!dateRange) {
        return <CustomEmpty />;
      } else {
        return (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span className="text-gray-500">No trades data available for this period</span>}
          />
        );
      }
    }

    return (
      <>
        {/* Table for larger screens */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">ID</th>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Symbol</th>
                <th scope="col" className="px-6 py-3">Buy/Sell</th>
                <th scope="col" className="px-6 py-3">Volume</th>
                <th scope="col" className="px-6 py-3">Profit</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((trade) => (
                <tr key={trade.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{trade.id}</td>
                  <td className="px-6 py-4">{new Date(trade.dates).toLocaleString()}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{trade.symbol}</td>
                  <td className="px-6 py-4">{renderTag(trade.buy_sell, trade)}</td>
                  <td className="px-6 py-4">{trade.volume === 0 ? '_' : trade.volume}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {trade.profit >= 0 ? `+${trade.profit}` : trade.profit} $
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for smaller screens */}
        <div className="md:hidden space-y-4">
          {paginatedData.map((trade) => (
            <div key={trade.id} className="bg-white shadow rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">ID: {trade.id}</span>
                {renderTag(trade.buy_sell, trade)}
              </div>
              <div className="text-sm text-gray-500 mb-2">{new Date(trade.dates).toLocaleString()}</div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900">{trade.symbol}</span>
                <span className="text-sm text-gray-500">Volume: {trade.volume === 0 ? '_' : trade.volume}</span>
              </div>
              <div className={`text-sm font-medium ${trade.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                Profit: {trade.profit >= 0 ? `+${trade.profit}` : trade.profit} $
              </div>
            </div>
          ))}
        </div>
        {renderPagination()}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <RangePicker 
          onChange={handleDateFilter} 
          className="w-full sm:w-auto"
          
        />
      </div>
      {renderContent()}
    </div>
  );
};

export default History;