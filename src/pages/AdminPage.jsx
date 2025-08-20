import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import { logout } from '../connect/state/auth/actions';
import { fetchRestaurants } from '../connect/state/restaurant/actions';
import Profile from '../components/admin/Profile';
import MenuItems from '../components/admin/MenuItems';
import Orders from '../components/admin/Orders';
import Categories from '../components/admin/Categories';
import RestaurantStatus from '../components/admin/RestaurantStatus';
 

const sections = [
  { key: 'profile', label: 'Profile', icon: PersonIcon },
  { key: 'menu-items', label: 'Menu Items', icon: RestaurantMenuIcon },
  { key: 'orders', label: 'Orders', icon: ReceiptIcon },
  { key: 'categories', label: 'Categories', icon: CategoryIcon },
  { key: 'restaurant-status', label: 'Restaurant Status', icon: StoreIcon },
];

const AdminPage = () => {
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
    navigate('/');
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
      case 'menu-items':
        return <MenuItems />;
      case 'orders':
        return <Orders />;
      case 'categories':
        return <Categories />;
      case 'restaurant-status':
        return <RestaurantStatus />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-black pt-16 pb-20 md:pb-0">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 shadow-lg flex-shrink-0 hidden md:flex flex-col ">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-300">Admin Dashboard</h1>
        </div>
        <nav className="flex-1 p-2 space-y-2 pt-8">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`w-full text-left px-2 py-2 rounded-lg transition font-medium flex items-center gap-3 ${
                  activeSection === section.key 
                    ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
              >
                <IconComponent />
                {section.label}
              </button>
            );
          })}
          <button
            onClick={handleRestaurantRoute}
            className="block w-full text-left px-4 py-2 rounded-lg font-medium text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 mt-4"
          >
            View Restaurant
          </button>
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-2 rounded-lg font-medium text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 mt-4 flex items-center gap-3"
          >
            <LogoutIcon /> Logout
          </button>
        </nav>
      </aside>
      
      {/* Mobile Bottom Nav */}
      <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black dark:border-t-[0.5px] dark:border-orange-300 border-t border-gray-200 shadow z-40">
        <div className="flex items-center justify-around h-16 px-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`text-sm w-12 h-12 rounded-full flex items-center justify-center transition ${
                  activeSection === section.key 
                    ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                title={section.label}
              >
                <IconComponent />
              </button>
            );
          })}
          <button
            onClick={handleRestaurantRoute}
            className="w-12 h-12 rounded-full flex items-center justify-center text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800"
            title="View Restaurant"
          >
            <span className="text-xl">🏪</span>
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
        <div className="w-full max-w-6xl mt-8 bg-white dark:bg-black dark:border-[0.2px] dark:border-orange-300 rounded-lg shadow p-4 md:p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;