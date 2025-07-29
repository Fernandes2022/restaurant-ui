import React, { useState } from 'react';
import Profile from '../components/user/Profile';
import Orders from '../components/user/Orders';
import Address from '../components/user/Address';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logout } from '../connect/state/auth/actions';
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

  const handleLogout = () => {
    dispatch(logout());
    navigate('/'); // Change to '/' if you want to redirect to home instead
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
    <div className="min-h-screen flex bg-gray-50 dark:bg-black pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 shadow-lg flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-orange-600 dark:text-orange-300">User Dashboard</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${activeSection === section.key ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            >
              {section.label}
            </button>
          ))}
          <a
            href="/menu"
            className="block px-4 py-2 rounded-lg font-medium text-left text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800 mt-4"
          >
            Order More
          </a>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-lg font-medium text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800 mt-4"
          >
            <LogoutIcon className="mr-2" /> Logout
          </button>
        </nav>
      </aside>
      
      <aside className="md:hidden w-20 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 shadow-lg flex flex-col items-center py-4">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`text-2xl my-2 w-12 h-12 rounded-full flex items-center justify-center transition ${activeSection === section.key ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
            title={section.label}
          >
            {section.label[0]}
          </button>
        ))}
        <a
          href="/menu"
          className="text-2xl my-2 w-12 h-12 rounded-full flex items-center justify-center text-green-700 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-800"
          title="Shop More"
        >
          <span>🛒</span>
        </a>
        <button
          onClick={handleLogout}
          className="text-2xl my-2 w-12 h-12 rounded-full flex items-center justify-center text-red-700 dark:text-red-200 hover:bg-red-100 dark:hover:bg-red-800"
          title="Logout"
        >
          <LogoutIcon />
        </button>
      </aside>
      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-3xl mt-8 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 rounded-lg shadow p-4 md:p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;