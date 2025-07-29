import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { Person } from '@mui/icons-material';
import { getUserProfile } from '../../connect/state/user/actions';


const Profile = () => {

  const dispatch = useDispatch();

    

  const userProfile = useSelector((state) => state.user.profile);
  
  const getUserInitial = () =>
    userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : <Person />;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !userProfile) {
      dispatch(getUserProfile());
    }
  }, [dispatch, userProfile]);

  // Show loading state while profile is being fetched
  if (!userProfile) {
    return (
      <div className="flex flex-col gap-3 items-center text-center py-6">
        <Avatar className="bg-orange-300 text-white font-bold text-2xl" sx={{ width: 70, height: 70 }}>
          <Person />
        </Avatar>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">Loading...</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-2">Loading profile...</p>
        <span className="inline-block px-3 py-1 text-xs bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 rounded-full">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 items-center text-center py-6">
      <Avatar className="bg-orange-300 text-white font-bold text-2xl" sx={{ width: 70, height: 70 }}>
      {getUserInitial()}
      </Avatar>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1">{userProfile.fullName}</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-2">{userProfile.email}</p>
      <span className="inline-block px-3 py-1 text-xs bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-200 rounded-full">{userProfile.role === 'ROLE_RESTAURANT_OWNER' ? 'Restaurant Owner' : 'User'}</span>
    </div>
  );
};

export default Profile; 