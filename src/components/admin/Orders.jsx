import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CancelIcon from '@mui/icons-material/Cancel';
import { getRestaurantOrders, updateOrderStatus } from '../../connect/state/order/actions';

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

const Orders = () => {
  const dispatch = useDispatch();
  const { restaurantOrders: orders, loading: ordersLoading } = useSelector(state => state.order);

  const [selectedStatus, setSelectedStatus] = useState('all');
  const [orderStatuses, setOrderStatuses] = useState({}); // local map for optimistic UI
  const [updatingOrders, setUpdatingOrders] = useState({}); // track which order(s) are updating

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(getRestaurantOrders());
    }
  }, [dispatch]);

  // Sync local statuses when orders arrive/change
  useEffect(() => {
    if (orders && Array.isArray(orders)) {
      const map = {};
      orders.forEach(o => {
        if (o && o._id) map[o._id] = o.orderStatus;
      });
      setOrderStatuses(map);
    }
  }, [orders]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    const current = orderStatuses[orderId];
    if (current === newStatus) return;

    // optimistic UI update
    setOrderStatuses(prev => ({ ...prev, [orderId]: newStatus }));
    setUpdatingOrders(prev => ({ ...prev, [orderId]: true }));

    try {
      
      await dispatch(updateOrderStatus(orderId, newStatus));

      
    } catch (error) {
      console.error('Error updating order status:', error);
      const fallback = orders?.find(o => o._id === orderId)?.orderStatus || 'PENDING';
      setOrderStatuses(prev => ({ ...prev, [orderId]: fallback }));
    } finally {
      setUpdatingOrders(prev => {
        const next = { ...prev };
        delete next[orderId];
        return next;
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'OUT_FOR_DELIVERY':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircleIcon className="text-green-600" />;
      case 'OUT_FOR_DELIVERY':
        return <LocalShippingIcon className="text-purple-600" />;
      case 'CANCELLED':
        return <CancelIcon className="text-red-600" />;
      default:
        return null;
    }
  };

  const displayOrders = orders || [];
  const loading = ordersLoading;

  const filteredOrders = displayOrders?.filter(order =>
    selectedStatus === 'all' || order.orderStatus === selectedStatus
  ) || [];

  // Show loading state only for initial load when no orders are available yet
  if (loading && (!orders || orders.length === 0)) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h2>
        </div>
        <div className="text-center p-8">
          <p className="text-gray-600 dark:text-gray-300">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Orders Management</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="all">All Orders</option>
            {STATUS_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const localStatus = orderStatuses[order._id] ?? order.orderStatus;
          const isUpdating = Boolean(updatingOrders[order._id]);

          return (
            <div
              key={order._id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 md:p-6 border border-gray-200 dark:border-gray-700 ${
                isUpdating ? 'opacity-75 relative' : ''
              }`}
            >
              {/* Loading overlay for individual order */}
              {isUpdating && (
                <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center z-10">
                  <div className="flex items-center gap-2 text-orange-600">
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="text-sm font-medium">Updating status...</span>
                  </div>
                </div>
              )}
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white break-all">
                    OrderId: #{String(order._id).toUpperCase()}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                    {(() => {
                      const date = new Date(order.createdAt);
                      if (isNaN(date.getTime()) || date > new Date()) {
                        return 'Invalid date';
                      }
                      return date.toLocaleString('en-NG', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Africa/Lagos'
                      });
                    })()}
                  </p>
                </div>
                <div className="flex items-center gap-2 sm:self-end">
                  {getStatusIcon(localStatus)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(localStatus)} ${
                    isUpdating ? 'animate-pulse' : ''
                  }`}>
                    {localStatus.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Customer Information</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Name: {order.customer?.fullName}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Email: {order.customer?.email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Delivery Information</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Name: {order.deliveryAddress?.fullName}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Address: {order.deliveryAddress?.streetAddress}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">City: {order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Phone: {order.deliveryAddress?.postalCode}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Type: {order.deliveryType}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">DeliveryFee: ₦{order.deliveryFee}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Order Items</h4>
                <div className="space-y-3">
                  {order.items?.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      {item.food?.images?.[0] && (
                        <img
                          src={item.food.images[0]}
                          alt={item.food.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-white">{item.food?.name}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Quantity: {item.quantity} × ₦{item.food?.price} = ₦{item.totalPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4">
                  <div className="flex justify-between items-center font-semibold text-gray-900 dark:text-white">
                    <span>Subtotal:</span>
                    <span>₦{(order.totalAmount - order.deliveryFee).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <span>Delivery Fee:</span>
                    <span>₦{order.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold text-gray-900 dark:text-white text-lg border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                    <span>Total:</span>
                    <span>₦{order.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Update Status:
                </label>

                <div className="flex items-center gap-2">
                  <select
                    value={localStatus}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    disabled={isUpdating}
                    className="w-full sm:w-auto px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-orange-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>

                  {/* small spinner shown only while updating this order */}
                  {isUpdating && (
                    <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            {orders && orders.length > 0 
              ? "No orders found for the selected status." 
              : "No orders found."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
