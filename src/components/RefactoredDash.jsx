import React, { useState } from 'react';
import { useGetTradesQuery, useGetKeyMetricsQuery } from '../services/BackendApi';
import moment from 'moment';
import { WalletOutlined, DollarOutlined, ArrowDownOutlined, ArrowUpOutlined, BankOutlined, MoneyCollectOutlined} from '@ant-design/icons';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import CustomEmpty from './CustomEmpty';
import DoughnutChart from './charts/DoughnutChart';
import { XMarkIcon } from '@heroicons/react/24/outline';
const Dashboard = ({ selectedAccount }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useGetKeyMetricsQuery(
    selectedAccount && selectedPeriod ? { timeRange: selectedPeriod, accountId: selectedAccount } : { timeRange: selectedPeriod, accountId: selectedAccount }
  );
  const { data: trades, isLoading: tradesLoading, error: tradesError } = useGetTradesQuery(selectedAccount);

  if (metricsLoading || tradesLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (metricsError || tradesError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-600">500</h1>
        <p className="text-xl mt-4">{metricsError?.error || tradesError?.error}</p>
        <button className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Back Home</button>
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return <CustomEmpty />;
  }

  if (!trades || trades.length === 0) {
    return (
      <div className="text-center p-12">
        <CustomEmpty description={<p className="text-gray-600">No trades data available</p>} />
      </div>
    );
  }

  const filteredTrades = trades.filter(record => record.buy_sell !== '0' && record.buy_sell !== '1');

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const MetricCard = ({ title, value, icon: Icon, colorClass, additionalContent }) => (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <Icon className={`h-5 w-5 ${colorClass}`} />
      </div>
      <p className={`text-xl font-bold ${colorClass}`}>{value}</p>
      {additionalContent}
    </div>
  );

  const TransactionModal = () => (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${isModalOpen ? '' : 'hidden'}`}>
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center pb-3">
          <p className="text-2xl font-bold">Transactions</p>
          <div className="cursor-pointer" onClick={closeModal}>
            <XMarkIcon className="h-6 w-6 text-gray-500" />
          </div>
        </div>
        <div className="mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrades.map((trade, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moment(trade.dates).format('MMMM Do YYYY, h:mm:ss a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trade.profit >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {trade.profit >= 0 ? 'Deposit' : 'Withdrawal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${Math.abs(trade.profit).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 ml-4 mt-2">
        <select
          className="block w-32 px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          value={selectedPeriod}
          onChange={handlePeriodChange}
        >
          <option value="All">All</option>
          <option value="year">Year</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="day">Day</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Balance"
          value={`$${metrics.account_balance.toFixed(2)}`}
          icon={BankOutlined}
          colorClass="text-blue-600"
          additionalContent={
            <button 
              className="mt-2 text-blue-500 hover:text-blue-700"
              onClick={openModal}
            >
              <BankOutlined className="h-4 w-4 inline-block mr-1" />
              View Transactions
            </button>
          }
        />
        <MetricCard
          title="Profit/Loss"
          value={`$${metrics.pnl.toFixed(2)}`}
          icon={MoneyCollectOutlined}
          colorClass={metrics.pnl >= 0 ? 'text-green-600' : 'text-red-600'}
          additionalContent={
            <button 
              className="mt-2 text-blue-500 hover:text-blue-700"
              onClick={openModal}
            >
              <MoneyCollectOutlined className="h-4 w-4 inline-block mr-1" />
              View Details
            </button>
          }
        />
        <MetricCard
          title="Win%"
          value={`${metrics.win_rate.toFixed(2)}%`}
          icon={ArrowUpOutlined}
          colorClass="text-green-600"
          additionalContent={
            <div className="flex justify-between mt-2">
              <span className="text-xs font-semibold text-green-500 bg-green-100 px-2 py-1 rounded">{metrics.winning_trades}</span>
              <span className="text-xs font-semibold text-red-500 bg-red-100 px-2 py-1 rounded">{metrics.losing_trades}</span>
            </div>
          }
        />
        <MetricCard
          title="Progress"
          value={`${metrics.progress.toFixed(2)}%`}
          icon={metrics.progress > 0 ? ArrowUpOutlined : ArrowDownOutlined}
          colorClass={metrics.progress > 0 ? 'text-green-600' : 'text-red-600'}
          additionalContent={
            <div className="mt-2">
              {metrics.progress > 0 ? (
                <ArrowUpOutlined className="h-5 w-5 text-green-500" />
              ) : (
                <ArrowDownOutlined className="h-5 w-5 text-red-500" />
              )}
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Balance Over Time</h3>
          <div className="h-64">
            <LineChart timeRange={selectedPeriod} accountId={selectedAccount} />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Trade Distribution</h3>
          <div className="h-64">
            <DoughnutChart timeRange={selectedPeriod} accountId={selectedAccount} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Performance</h3>
        <div className="h-96">
          <BarChart timeRange={selectedPeriod} accountId={selectedAccount} />
        </div>
      </div>

      <TransactionModal />
    </div>
  );
};

export default Dashboard;