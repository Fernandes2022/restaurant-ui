import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { searchMenuItems, clearSearchResults } from '../../connect/state/menu/actions';
import { fetchCart } from '../../connect/state/cart/actions';
import { getUserProfile } from '../../connect/state/user/actions';
import { LightMode, DarkMode, Menu, Close, Person, Search, ShoppingCart } from '@mui/icons-material';
import { ModeContext } from '../Mode';
import { Box, IconButton, Badge, Avatar } from '@mui/material';
import AuthModal from './AuthModal';


const NavBar = () => {
  const [query, setQuery] = useState('');
  const [debounceQuery, setDebounceQuery] = useState('');
  const [navMobile, setNavMobile] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const rawSearchResults = useSelector((state) => state.menu.searchResults);
  const searchLoading = useSelector((state) => state.menu.loading);

  const { theme, themeToggle } = useContext(ModeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.user.profile);
  const cart = useSelector((state) => state.cart.cart);
  const cartItemsCount = cart?.totalItems || 0;

  // Load profile and cart if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!userProfile) {
        dispatch(getUserProfile());
      }
      dispatch(fetchCart());
    }
  }, [dispatch, userProfile]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebounceQuery(query), 400);
    return () => clearTimeout(timer);
  }, [query]);

  // Perform search
  useEffect(() => {
    if (debounceQuery.trim()) {
      dispatch(searchMenuItems(debounceQuery));
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      dispatch(clearSearchResults());
    }
  }, [debounceQuery, dispatch]);

  // Close modal and redirect after login
  useEffect(() => {
    if (userProfile && userProfile !== null && authModalOpen) {
      setAuthModalOpen(false);
        navigate(userProfile.role === 'ROLE_RESTAURANT_OWNER' ? `/restaurant/${userProfile._id}/dashboard` : `/user/${userProfile._id}/dashboard`);
    }
  }, [userProfile, navigate]); // Removed authModalOpen from dependencies

  // Filter and sort results
  const [filteredResults, setFilteredResults] = useState([]);
  useEffect(() => {
    if (rawSearchResults?.length && debounceQuery.trim()) {
      const lower = debounceQuery.trim().toLowerCase();
      const exactMatch = rawSearchResults.find((item) => item.name.toLowerCase() === lower);
      const matches = rawSearchResults.filter((item) => item.name.toLowerCase().includes(lower));
      setFilteredResults(
        exactMatch ? [exactMatch, ...matches.filter((item) => item._id !== exactMatch._id)] : matches
      );
    } else {
      setFilteredResults([]);
    }
  }, [rawSearchResults, debounceQuery]);

  const getUserInitial = () =>
    userProfile?.fullName ? userProfile.fullName.charAt(0).toUpperCase() : <Person />;

  const handleAvatarClick = () => {
    setNavMobile(false);
    if (!userProfile || userProfile === null) {
      setAuthModalOpen(true);
    } else {
      navigate(userProfile.role === 'ROLE_RESTAURANT_OWNER' ? `/restaurant/${userProfile._id}/dashboard` : `/user/${userProfile._id}/dashboard`);
    }
  };

  const handleResultClick = (result) => {
    setQuery('');
    setShowSearchResults(false);
    navigate(`/restaurant/${result.restaurant || 'menu'}`);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setNavMobile(false);
  };

  const isHomePage = location.pathname === '/';

  // Close mobile menu on route changes
  useEffect(() => {
    setNavMobile(false);
  }, [location.pathname]);

  return (
    <>
      <header className="px-3 lg:px-4">
        <nav
          className="top-0 left-0 right-0 border border-t-0 border-r-0 border-l-0 dark:bg-black border-b-slate-200 dark:border-b-slate-500 fixed z-50 backdrop-blur-3xl py-3 sm:py-2"
          data-aos="flip-up"
          data-aos-duration="2000"
        >
          <div className="flex items-center justify-between z-50 px-3 sm:px-4 gap-2 sm:gap-4">
            <div className="pr-2 flex-shrink-0">
              <Link to={'/'}>
                <h1 className="font-bold tracking-tighter text-2xl sm:text-3xl whitespace-nowrap bg-gradient-to-r from-orange-300 to-yellow-100 bg-clip-text text-transparent">
                  Nutri-C
                </h1>
              </Link>
            </div>

            {/* Search Box */}
            <div className="flex-1 min-w-0 md:w-full max-w-sm relative px-2 sm:px-3">
              <div className="flex items-center border border-gray-300 rounded-2xl px-3 py-2 sm:py-1 bg-white shadow-sm">
                <Search className="text-gray-500 mr-2" />
                <input
                  type="text"
                  placeholder="Search menu items"
                  className="focus:outline-none text-sm w-full bg-transparent text-black"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setShowSearchResults(true)}
                  onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                />
              </div>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded-b-lg border border-gray-200 dark:border-gray-700 max-h-64 overflow-y-auto z-50">
                  {searchLoading ? (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">Searching...</div>
                  ) : filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                      <div
                        key={result._id}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0"
                        onClick={() => handleResultClick(result)}
                      >
                        <h3 className="font-medium text-gray-900 dark:text-white">{result.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{result.description}</p>
                        {result.price && (
                          <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                            ₦{result.price}
                          </p>
                        )}
                      </div>
                    ))
                  ) : null}
                </div>
              )}
            </div>

            {/* Navigation Links - Desktop */}
            {isHomePage && (
              <Box className="hidden lg:flex items-center space-x-6 mr-4">
                {['home', 'menu', 'testimonials', 'about', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </Box>
            )}

            {/* Icons */}
            <Box className="items-center hidden sm:flex space-x-2">
              {/* Cart */}
              <IconButton
                className="text-orange-600 hover:text-orange-700 transition-colors relative"
                size="large"
                onClick={() => navigate('/cart')}
                sx={{
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  },
                }}
              >
                <Badge
                  badgeContent={cartItemsCount || 0}
                  showZero
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#ea580c',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      minWidth: '20px',
                      height: '20px',
                      borderRadius: '10px',
                    },
                  }}
                >
                  <ShoppingCart className="text-orange-300" sx={{ fontSize: 28 }} />
                </Badge>
              </IconButton>

              {/* User Avatar */}
              <IconButton
                className="bg-orange-300 hover:text-orange-700 transition-colors"
                size="large"
                sx={{
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  },
                }}
                onClick={handleAvatarClick}
              >
                <Avatar className="bg-orange-300 text-white font-semibold" sx={{ width: 36, height: 36 }}>
                  {getUserInitial()}
                </Avatar>
              </IconButton>

              
              <IconButton
                onClick={themeToggle}
                className="text-orange-600 hover:text-orange-700 transition-colors"
                size="large"
                sx={{
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: 'rgba(251, 146, 60, 0.1)',
                  },
                }}
              >
                {theme === 'dark' ? (
                  <LightMode className="text-orange-300" sx={{ fontSize: 28 }} />
                ) : (
                  <DarkMode className="text-orange-300" sx={{ fontSize: 28 }} />
                )}
              </IconButton>
            </Box>

            {/* Mobile Nav Toggle */}
            <div className="sm:hidden flex-shrink-0">
              <button
                className="text-orange-300 cursor-pointer outline-0 p-3"
                onClick={() => setNavMobile(!navMobile)}
              >
                {navMobile ? <Close sx={{ fontSize: 45 }} /> : <Menu sx={{ fontSize: 45 }} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {navMobile && (
          <div
            className="fixed top-20 left-0 right-0 z-40 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 shadow-lg sm:hidden"
          >
            <div className="px-4 py-6 space-y-4" onClick={() => setNavMobile(false)}>
              {isHomePage && (
                <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  {['home', 'menu', 'testimonials', 'about', 'contact'].map((section) => (
                    <button
                      key={section}
                      onClick={() => scrollToSection(section)}
                      className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-medium py-2"
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between pt-4 border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                  {/* Cart */}
                  <IconButton
                    className="text-orange-600 hover:text-orange-700 transition-colors relative"
                    size="large"
                    onClick={() => { setNavMobile(false); navigate('/cart'); }}
                    sx={{
                      width: 48,
                      height: 48,
                      '&:hover': {
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                      },
                    }}
                  >
                    <Badge
                      badgeContent={cartItemsCount || 0}
                      showZero
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: '#ea580c',
                          color: 'white',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          minWidth: '20px',
                          height: '20px',
                          borderRadius: '10px',
                        },
                      }}
                    >
                      <ShoppingCart className="text-orange-300" sx={{ fontSize: 28 }} />
                    </Badge>
                  </IconButton>

                  {/* User Avatar */}
                  <IconButton
                    className="text-orange-600 hover:text-orange-700 transition-colors"
                    size="large"
                    onClick={handleAvatarClick}
                    sx={{
                      width: 48,
                      height: 48,
                      '&:hover': {
                        backgroundColor: 'rgba(251, 146, 60, 0.1)',
                      },
                    }}
                  >
                    <Avatar className="bg-orange-600 text-white font-semibold" sx={{ width: 36, height: 36 }}>
                      {getUserInitial()}
                    </Avatar>
                  </IconButton>
                </div>

                {/* Theme Toggle */}
                <IconButton
                  onClick={() => { themeToggle(); setNavMobile(false); }}
                  className="text-orange-600 hover:text-orange-700 transition-colors"
                  size="large"
                  sx={{
                    width: 48,
                    height: 48,
                    '&:hover': {
                      backgroundColor: 'rgba(251, 146, 60, 0.1)',
                    },
                  }}
                >
                  {theme === 'dark' ? (
                    <LightMode className="text-orange-300" sx={{ fontSize: 28 }} />
                  ) : (
                    <DarkMode className="text-orange-300" sx={{ fontSize: 28 }} />
                  )}
                </IconButton>
              </div>
            </div>
          </div>
        )}
      </header>
      <AuthModal open={authModalOpen} handleClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default NavBar;
