import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../connect/state/user/actions';
import { 
  LocationOn, 
  Home, 
  Phone, 
  Public
} from '@mui/icons-material';

const Address = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  if (loading) {
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
          <p className="text-lg font-semibold">Error loading addresses</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!profile || !profile.addresses || profile.addresses.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p className="text-lg font-semibold">No addresses found</p>
          <p className="text-sm">You haven't added any delivery addresses yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Your Addresses</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {profile.addresses.map((address) => (
           <div
             key={address._id}
             className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-2 border-gray-200 dark:border-gray-700"
           >
                         <div className="flex items-start justify-between mb-4">
               <div className="flex items-center">
                 <div className="w-3 h-3 rounded-full bg-orange-300 mr-3"></div>
                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                   {address.fullName}
                 </h3>
               </div>
             </div>
            
                         <div className="space-y-2 text-gray-600 dark:text-gray-300">
               <p className="flex items-start">
                 <LocationOn className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-sm">{address.streetAddress}</span>
               </p>
               
               <p className="flex items-start">
                 <Home className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-sm">{address.city}, {address.state}</span>
               </p>
               
               <p className="flex items-start">
                 <Phone className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-sm">{address.postalCode}</span>
               </p>
               
               <p className="flex items-start">
                 <Public className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                 <span className="text-sm">{address.country}</span>
               </p>
             </div>
            
            
          </div>
        ))}
      </div>
      
      
      
      
    </div>
  );
};

export default Address; 