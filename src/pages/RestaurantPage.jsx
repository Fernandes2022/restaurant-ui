import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IconButton, CircularProgress } from '@mui/material';
import { Add, Remove, ShoppingCart, Restaurant, Star, LocationOn, Phone, AccessTime } from '@mui/icons-material';
import { fetchRestaurants, addToFavourite } from '../connect/state/restaurant/actions';
import { addToCart, fetchCart } from '../connect/state/cart/actions';
import { fetchCategories } from '../connect/state/category/actions';
 

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantities, setQuantities] = useState({});
  const [addingItemId, setAddingItemId] = useState(null);

  const restaurants = useSelector((state) => state.restaurant.restaurants);
  const restaurantLoading = useSelector((state) => state.restaurant.loading);
  const restaurant = restaurants.length > 0 ? restaurants[0] : null;
  const { categories, loading: categoriesLoading } = useSelector((state) => state.category);
  const menuItems = restaurant?.foods || [];
  const cart = useSelector((state) => state.cart.cart);
  const cartItems = cart?.items || [];
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchCategories(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const savedCategory = localStorage.getItem('selectedRestaurantCategory');
    if (savedCategory) {
      setSelectedCategory(savedCategory);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedRestaurantCategory', selectedCategory);
  }, [selectedCategory]);

  const filteredMenuItems = menuItems.filter(item =>
    selectedCategory === 'all' ? true : item.foodCategory === selectedCategory
  );

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = async (item, currentQuantity) => {
    if (!token) {
      alert('Please log in to add items to cart.');
      return;
    }

    setAddingItemId(item._id);
    try {
      await dispatch(addToCart({ menuItemId: item._id, quantity: currentQuantity }));
      await dispatch(fetchCart());
      setQuantities(prev => ({ ...prev, [item._id]: 0 }));
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingItemId(null);
    }
  };


  const getCartQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.food?._id === itemId || item.foodId === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black pt-16 flex items-center justify-center">
        <CircularProgress className="text-orange-600" />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black pt-16 flex items-center justify-center">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <Restaurant className="text-6xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold mb-2">Restaurant Not Found</h2>
          <p>Sorry, we couldn't find the restaurant you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 px-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
      <div className="bg-white dark:bg-black   shadow-lg" data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full md:w-64 h-48 md:h-48 rounded-lg overflow-hidden flex-shrink-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
              <img
                src={restaurant.images?.[0] || '/default-restaurant.jpg'}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    {restaurant.name}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                      <Star className="text-yellow-500" />
                      <span>4.5</span>
                    </div>
                    <div className="flex items-center gap-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                      <LocationOn />
                      <span>{restaurant.address?.streetAddress}, {restaurant.address?.city}, {restaurant.address?.state}</span>
                    </div>
                    {restaurant.contactInformation?.phone && (
                      <div className="flex items-center gap-1" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="350">
                        <Phone />
                        <span>{restaurant.contactInformation.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                {restaurant.description}
              </p>

              {restaurant.openingHours && (
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                  <AccessTime />
                  <span>{restaurant.openingHours}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 bg-white dark:bg-black dark:border-[0.2px] dark:border-orange-300 rounded-lg shadow-lg p-6 flex-shrink-0" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-300 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Categories</h2>
            {categoriesLoading ? (
              <div className="flex justify-center py-4">
                <CircularProgress size={24} className="text-orange-600" />
              </div>
            ) : (
              <nav className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                    selectedCategory === 'all'
                      ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map((category, idx) => (
                  <button
                    key={category._id}
                    onClick={() => setSelectedCategory(category._id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                      selectedCategory === category._id
                        ? 'bg-orange-100 dark:bg-orange-700 text-orange-700 dark:text-orange-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'
                    }`}
                    data-aos="fade-up" data-aos-duration="1000" data-aos-delay={(idx + 1) * 120}
                  >
                    {category.name}
                  </button>
                ))}
              </nav>
            )}
          </aside>

          <main className="flex-1">
            <div className="bg-white dark:bg-black rounded-lg shadow-lg p-6" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">Menu</h2>
                <div className="flex items-center gap-2 text-orange-600 dark:text-orange-300" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                  <ShoppingCart />
                  <span className="font-semibold">{cartItems.length} items</span>
                </div>
              </div>

              {filteredMenuItems.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                  <Restaurant className="text-6xl mb-4 mx-auto" />
                  <p>No menu items found for this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMenuItems.map((item, idx) => {
                    const cartQuantity = getCartQuantity(item._id);
                    const currentQuantity = quantities[item._id] || 0;

                    return (
                      <div
                        key={item._id}
                        className="dark:border-[0.2px] dark:border-orange-300 rounded-xl overflow-hidden shadow hover:shadow-xl transition-transform hover:-translate-y-1 bg-white dark:bg-black p-2"
                        data-aos="fade-up" data-aos-duration="1000" data-aos-delay={(idx + 1) * 150}
                      >
                        <div className="h-32 md:h-40 overflow-hidden">
                          <img
                            src={item.images?.[0] || '/default-food.jpg'}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">{item.name}</h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xl font-bold text-orange-600 dark:text-orange-300">₦{item.price}</span>
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-500 text-sm" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">4.5</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                {item.available? <><IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item._id, -1)}
                                className="text-orange-600 hover:bg-orange-50 dark:hover:bg-green-500 dark:bg-orange-700"
                              >
                                <Remove />
                              </IconButton>
                              <span className="px-3 py-1 font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 rounded-md min-w-[40px] text-center">
                                {currentQuantity}
                              </span>
                              <IconButton
                                size="small"
                                onClick={() => handleQuantityChange(item._id, 1)}
                                className="text-orange-600 hover:bg-orange-50 dark:hover:bg-green-500 dark:bg-orange-300"
                              >
                                <Add />
                              </IconButton>
                              </>
                              :
                              <span className="text-red-500">
                                Not Available at the moment
                              </span>
                            }
                            </div>

                            <button
                              onClick={() => handleAddToCart(item, currentQuantity)}
                              disabled={currentQuantity <= 0 || addingItemId === item._id}
                              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                              {addingItemId === item._id ? 'Adding...' : `Add ${currentQuantity} to Cart`}
                            </button>
                          </div>

                          {cartQuantity > 0 && (
                            <div className="mt-2 text-center">
                              <span className="text-sm text-green-600 dark:text-green-400">
                                {cartQuantity} in cart
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
