import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../../connect/state/order/actions';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    // Always fetch fresh data when component mounts
    setHasFetched(true);
    dispatch(getUserOrders());
  }, [dispatch]);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time function for Nigeria timezone
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-NG', {
      timeZone: 'Africa/Lagos',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Get status badge styling
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200';
      case 'IN_PROGRESS':
      case 'OUT_FOR_DELIVERY':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200';
      case 'PENDING':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  // Format status for display
  const formatStatus = (status) => {
    return status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  // Show loading if we're loading OR if we haven't fetched yet
  if (loading || !hasFetched) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <p className="text-lg font-semibold">Error loading orders</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
          <button 
            onClick={() => {
              setHasFetched(false);
              dispatch(getUserOrders());
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Only show "No orders found" if we've fetched and there are no orders
  if (hasFetched && (!orders || orders.length === 0)) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg font-semibold">No orders found</p>
          <p className="text-sm">You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Your Orders</h2>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Time Created</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200 font-mono">{order._id}</td>
                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-200">{formatTime(order.createdAt)}</td>
                <td className="px-1 py-3 text-sm text-gray-700 dark:text-gray-200">{formatDate(order.createdAt)}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200">{formatCurrency(order.totalAmount)}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyle(order.orderStatus)}`}>{formatStatus(order.orderStatus)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden space-y-3">
        {orders.map((order) => (
          <div key={order._id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{order._id}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  <span className="font-medium">{formatDate(order.createdAt)}</span>
                  <span className="mx-2">•</span>
                  {formatTime(order.createdAt)}
                </p>
              </div>
              <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeStyle(order.orderStatus)}`}>{formatStatus(order.orderStatus)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Total</span>
              <span className="text-base font-semibold text-gray-800 dark:text-gray-100">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders; 