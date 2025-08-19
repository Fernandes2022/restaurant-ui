import React, { useState, useEffect } from 'react';
import Profile from '../components/user/Profile';
import Orders from '../components/user/Orders';
import Address from '../components/user/Address';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../connect/state/auth/actions';
import { fetchRestaurants } from '../connect/state/restaurant/actions';
import { useNavigate } from 'react-router-dom';
 

const sections = [
  { key: 'profile', label: 'Profile' },
  { key: 'orders', label: 'Orders' },
  { key: 'address', label: 'Address' },
];

const UserDashboard = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { restaurants, loading } = useSelector(state => state.restaurant);

  useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  // Get the first restaurant
  const firstRestaurant = restaurants && restaurants.length > 0 ? restaurants[0] : null;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Change to '/' if you want to redirect to home instead
  };

  const handleRestaurantRoute = () => {
    if (firstRestaurant) {
      navigate(`/restaurant/${firstRestaurant._id}`);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <Profile />;
      case 'orders':
        return <Orders />;
      case 'address':
        return <Address />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-black pt-16 pb-20 md:pb-0">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 shadow-lg flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-300">User Dashboard</h1>
        </div>
        <nav className="flex-1 p-2 space-y-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full text-left px-2 py-2 rounded-lg transition font-medium ${activeSection === section.key ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            >
              {section.label}
            </button>
          ))}
          <button
            onClick={handleRestaurantRoute}
            className="block w-full text-left px-4 py-2 rounded-lg font-medium text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 mt-4"
          >
            Order More
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-2 rounded-lg font-medium text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 mt-4"
          >
            <LogoutIcon className="mr-2" /> Logout
          </button>
        </nav>
      </aside>
      
      {/* Mobile Bottom Nav */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black dark:border-t-[0.5px] dark:border-orange-300 border-t border-gray-200 shadow z-40">
        <div className="flex items-center justify-around h-16 px-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`text-sm w-12 h-12 rounded-full flex items-center justify-center transition ${activeSection === section.key ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
              title={section.label}
            >
              {section.label[0]}
            </button>
          ))}
          <button
            onClick={handleRestaurantRoute}
            className="w-12 h-12 rounded-full flex items-center justify-center text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800"
            title="Shop More"
          >
            <span className="text-xl">🛒</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-12 h-12 rounded-full flex items-center justify-center text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800"
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </aside>
      {/* Main content */}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-3xl mt-8 bg-white dark:bg-black dark:border-[0.2px] dark:border-orange-300 rounded-lg shadow p-4 md:p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;