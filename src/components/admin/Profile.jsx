import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Person } from '@mui/icons-material';
import { fetchMyRestaurant } from '../../connect/state/restaurant/actions';

const Profile = () => {
  const dispatch = useDispatch();
  const { myRestaurant, loading, error } = useSelector((state) => state.restaurant);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchMyRestaurant());
    }
  }, [dispatch]);

  const renderOwnerInitial = () => {
    const name = myRestaurant?.owner?.fullName;
    return name ? name.charAt(0).toUpperCase() : <Person />;
  };

  if (loading) {
    return (
      <div className="text-center p-8">
        <Avatar sx={{ width: 70, height: 70 }} className="mx-auto mb-4">
          <Person />
        </Avatar>
        <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <Avatar sx={{ width: 70, height: 70 }} className="mx-auto mb-4">
          <Person />
        </Avatar>
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  if (!myRestaurant) return null;

  return (
    <div className="text-center p-8">
      <Avatar sx={{ width: 70, height: 70 }} className="mx-auto mb-4">
        {renderOwnerInitial()}
      </Avatar>
      <h2 className="font-bold text-lg mt-4 text-gray-900 dark:text-gray-100">
        {myRestaurant.owner?.fullName || 'Restaurant Owner'}
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        {myRestaurant.owner?.email || 'No email available'}
      </p>
      <span className="text-sm text-gray-500 dark:text-gray-400 block mt-1">
        {myRestaurant.owner?.role === 'ROLE_RESTAURANT_OWNER' ? 'Restaurant Owner' : 'Owner'}
      </span>
      <div className="mt-6 text-gray-700 dark:text-gray-300">
        <div className="font-semibold">{myRestaurant.name}</div>
        <div>
          {myRestaurant.address?.streetAddress}, {myRestaurant.address?.city}, {myRestaurant.address?.state}
        </div>
      </div>
    </div>
  );
};

export default Profile;
