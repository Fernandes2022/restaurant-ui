import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { fetchMyRestaurant, updateRestaurantStatus } from '../../connect/state/restaurant/actions';

const RestaurantStatus = () => {
  const dispatch = useDispatch();
  const { myRestaurant, loading, error } = useSelector(state => state.restaurant);
  
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    // Fetch restaurant details on component mount
    dispatch(fetchMyRestaurant());
  }, [dispatch]);

  const handleToggleStatus = async () => {
    if (!myRestaurant?._id) return;
    
    setLocalLoading(true);
    try {
      await dispatch(updateRestaurantStatus(myRestaurant._id));
      // The reducer will automatically update the myRestaurant state
    } catch (error) {
      console.error('Failed to toggle restaurant status:', error);
    } finally {
      setLocalLoading(false);
    }
  };

  // Show loading state while fetching restaurant data
  if (loading && !myRestaurant) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  // Show error state if restaurant fetch failed
  if (error && !myRestaurant) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
        <h4 className="font-medium text-red-900 dark:text-red-100 mb-2">Error</h4>
        <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  // Show message if no restaurant is found
  if (!myRestaurant) {
    return (
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
        <h4 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">No Restaurant Found</h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          You don't have a restaurant set up yet. Please create a restaurant first.
        </p>
      </div>
    );
  }

  // Use Redux state directly for the current open/closed status
  const isOpen = myRestaurant.open || false;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Restaurant Status</h2>
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            isOpen 
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
          }`}>
            {myRestaurant.open ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
      </div>

      {/* Status Toggle Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <RestaurantIcon className="text-2xl text-orange-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Restaurant Status</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Control whether your restaurant is accepting orders
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleStatus}
            disabled={localLoading || loading}
            className={`px-6 py-3 rounded-lg font-medium transition ${
              myRestaurant.open
                ? 'bg-red-600 text-white hover:bg-red-700'
                : 'bg-green-600 text-white hover:bg-green-700'
            } disabled:opacity-50`}
          >
            {localLoading || loading ? 'Updating...' : myRestaurant.open ? 'Close Restaurant' : 'Open Restaurant'}
          </button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AccessTimeIcon className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Status</span>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Your restaurant is currently <strong>{myRestaurant.open ? 'OPEN' : 'CLOSED'}</strong> and 
            {myRestaurant.open ? ' accepting orders from customers.' : ' not accepting any new orders.'}
          </p>
        </div>
      </div>

      {/* Business Hours Display Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <AccessTimeIcon className="text-2xl text-orange-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Business Hours</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your restaurant's operating hours
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Opening Time
            </label>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {myRestaurant.openTime || '09:00'}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Closing Time
            </label>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {myRestaurant.closeTime || '22:00'}
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={myRestaurant.isOpen || false}
              disabled
              className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900 dark:text-white">
              Automatically open restaurant during business hours
            </label>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Status Information</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• When closed, customers cannot place new orders</li>
          <li>• Existing orders will continue to be processed</li>
          <li>• You can manually override the automatic status</li>
          <li>• Business hours help customers know when you're typically open</li>
        </ul>
      </div>
    </div>
  );
};

export default RestaurantStatus; 