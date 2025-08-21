import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, LocationOn } from '@mui/icons-material';
import {
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  fetchCart,
  setDeliveryType,
} from '../../connect/state/cart/actions';
import { createOrder } from '../../connect/state/order/actions';
import { sendAdminNewOrderEmail } from '../../services/notifications';
import { Modal, Box } from '@mui/material';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const userProfile = useSelector((state) => state.user.profile);

  const [modalOpen, setModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({
    streetAddress: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    fullName: userProfile?.fullName || '',
  });

  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');

  const [loadingItemId, setLoadingItemId] = useState(null);
  const [clearLoading, setClearLoading] = useState(false);
  const [loadingAddressId, setLoadingAddressId] = useState(null); 

  const cartItems = cart?.items || [];
  const totalQuantity = cart?.totalItems || 0;
  const totalPrice = cart?.totalPrice || 0;
  const deliveryFee = cart?.deliveryFee || 0;
  const total = cart?.total || 0;
  const restaurantId = cartItems[0]?.food?.restaurant?._id;
  const hasUnavailableItem = cartItems.some(
    (item) => item?.food?.available === false || item?.available === false
  );
  const unavailableItems = cartItems.filter(
    (item) => item?.food?.available === false || item?.available === false
  );
  const unavailableItemNames = Array.from(
    new Set(
      unavailableItems
        .map((item) => item?.food?.name || item?.name)
        .filter(Boolean)
    )
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const [deliveryType, setDeliveryTypeState] = useState(cart?.deliveryType || 'IN_CAMPUS');
  useEffect(() => {
    if (cart?.deliveryType) {
      setDeliveryTypeState(cart.deliveryType);
    }
  }, [cart?.deliveryType]);

  const handleDeliveryTypeChange = async (e) => {
    const newType = e.target.value;
    setDeliveryTypeState(newType);
    await dispatch(setDeliveryType(newType));
    dispatch(fetchCart());
  };

  const addresses = userProfile?.addresses || [];

  const handleAdd = async (item) => {
    setLoadingItemId(item._id);
    await dispatch(updateCartItemQuantity({ cartItemId: item._id, quantity: item.quantity + 1 }));
    setLoadingItemId(null);
  };

  const handleReduce = async (item) => {
    setLoadingItemId(item._id);
    if (item.quantity <= 1) {
      await dispatch(removeCartItem(item._id));
    } else {
      await dispatch(updateCartItemQuantity({ cartItemId: item._id, quantity: item.quantity - 1 }));
    }
    setLoadingItemId(null);
  };

  const handleRemove = async (item) => {
    setLoadingItemId(item._id);
    await dispatch(removeCartItem(item._id));
    setLoadingItemId(null);
  };

  const handleClearCart = async () => {
    setClearLoading(true);
    await dispatch(clearCart());
    setClearLoading(false);
  };

  const handleOrder = async (address) => {
    if (hasUnavailableItem) {
      setOrderError('some item is not available');
      return;
    }
    if (!restaurantId) {
      setOrderError('No restaurant found in cart.');
      return;
    }

    const deliveryAddress = address._id ? { _id: address._id } : address;

    setLoadingAddressId(address._id || 'new'); // Track specific address
    setOrderError('');
    setOrderSuccess('');
    try {
      await dispatch(
        createOrder({
          restaurantId,
          deliveryAddress,
        })
      );
      // Fire-and-forget admin email notification (non-blocking)
      sendAdminNewOrderEmail({
        adminEmail: import.meta.env.VITE_ADMIN_EMAIL || 'fernandes067977261@gmail.com',
        customerName: 'Nutri-C',
      }).catch(() => {});
      setOrderSuccess('Order placed successfully!');
      dispatch(clearCart());
      dispatch(fetchCart());
      setModalOpen(false);
    } catch (err) {
      setOrderError('Failed to place order.');
    } finally {
      setLoadingAddressId(null);
    }
  };

  const handleModalInput = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleModalOrder = (e) => {
    e.preventDefault();
    handleOrder(newAddress);
  };

  return (
    <div className="mt-16 pt-8 px-2 md:px-8 lg:px-20 min-h-screen bg-gray-50 dark:bg-black transition-colors" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="100">
      <div className="flex flex-col lg:flex-row gap-8 pt-10 px-4 pb-20 justify-center items-center" data-aos="zoom-in" data-aos-duration="3000" data-aos-delay="200">
        {/* Cart Details */}
        <div className="flex-1 bg-white dark:bg-black dark:border dark:border-orange-300 rounded-lg shadow p-16" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="150">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-300" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <ShoppingCart /> Cart Details
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">Your cart is empty.</div>
          ) : (
            <>
              {hasUnavailableItem && (
                <div className="mb-4 p-3 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-800">
                  Some items are not available: {unavailableItemNames.join(', ')}
                </div>
              )}
              <div className="space-y-12 py-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                    data-aos="fade-up" data-aos-duration="1000" data-aos-delay={(index + 1) * 120}
                  >
                    <img
                      src={item.food.images[0]}
                      alt={item.food.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">{item.food.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">₦{item.food.price}</div>
                      {(item?.food?.available === false || item?.available === false) && (
                        <div className="text-sm text-red-600 dark:text-red-400 mt-1">Not Available at the moment</div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {/* Decrease */}
                        <button
                          onClick={() => handleReduce(item)}
                          disabled={loadingItemId === item._id}
                          className="p-1 rounded-full border border-orange-600 disabled:opacity-50"
                        >
                          {loadingItemId === item._id ? (
                            <span className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                          ) : (
                            <Remove className="text-orange-600" />
                          )}
                        </button>

                        <span className="px-2 font-medium">{item.quantity}</span>

                        {/* Increase */}
                        <button
                          onClick={() => handleAdd(item)}
                          disabled={loadingItemId === item._id}
                          className="p-1 rounded-full border border-orange-600 disabled:opacity-50"
                        >
                          {loadingItemId === item._id ? (
                            <span className="w-4 h-4 border-2 border-orange-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                          ) : (
                            <Add className="text-orange-600" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="font-bold text-orange-600 dark:text-orange-300 text-lg flex flex-col items-center gap-4">
                      {/* Delete */}
                      <button
                        onClick={() => handleRemove(item)}
                        disabled={loadingItemId === item._id}
                        className="p-1 rounded-full border border-red-500 disabled:opacity-50"
                      >
                        {loadingItemId === item._id ? (
                          <span className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin inline-block"></span>
                        ) : (
                          <Delete className="text-red-500" />
                        )}
                      </button>
                      <div>₦{item.totalPrice.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals and Clear Cart */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-8 gap-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
                <div className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Total Quantity: <span className="text-orange-600 dark:text-orange-300">{totalQuantity}</span>
                  <br />
                  Total Price: <span className="text-orange-600 dark:text-orange-300">₦{totalPrice.toFixed(2)}</span>
                  <br />
                  Delivery Fee: <span className="text-orange-600 dark:text-orange-300">₦{deliveryFee.toFixed(2)}</span>
                  <br />
                  Total: <span className="text-orange-600 dark:text-orange-300">₦{total.toFixed(2)}</span>
                </div>

                <div className="mt-2">
                  <label className="block mb-1 text-lg font-medium text-gray-600 dark:text-gray-300">
                    Delivery Type
                  </label>
                  <select
                    value={deliveryType}
                    onChange={handleDeliveryTypeChange}
                    className="px-3 py-2 rounded border border-gray-300 dark:border-orange-300 bg-transparent text-gray-800 dark:text-orange-300"
                  >
                    <option value="IN_CAMPUS">In-Campus (₦300)</option>
                    <option value="OFF_CAMPUS">Off-Campus (₦500)</option>
                  </select>
                </div>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
                  onClick={handleClearCart}
                  disabled={clearLoading}
                >
                  {clearLoading ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                  ) : (
                    'Clear Cart'
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Delivery Address */}
        <div className="flex-1 bg-white dark:bg-black dark:border dark:border-orange-300 rounded-lg shadow p-14" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-300" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250">
            <LocationOn /> Delivery Address
          </h2>
          {hasUnavailableItem && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-800">
              Some items are not available: {unavailableItemNames.join(', ')}
            </div>
          )}
          {addresses.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">No saved addresses found.</div>
          ) : (
            <div className="space-y-10 mb-6">
              {addresses.map((address, idx) => (
                <div
                  key={address._id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col md:flex-row items-center md:justify-between gap-6"
                  data-aos="fade-up" data-aos-duration="1000" data-aos-delay={(idx + 1) * 150}
                >
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-100">{address.fullName}</div>
                    <div className="text-orange-600 dark:text-orange-300 text-sm">{address.postalCode}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">{address.streetAddress}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">{address.city}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">{address.state}</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">{address.country}</div>
                  </div>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => handleOrder(address)}
                    disabled={loadingAddressId === address._id || cartItems.length === 0 || hasUnavailableItem}
                  >
                    {loadingAddressId === address._id ? (
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                    ) : hasUnavailableItem ? (
                      'some item is not available'
                    ) : (
                      'Select & Order'
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='py-2'>
          {orderError && <div className="text-red-500 mt-2">{orderError}</div>}
          {orderSuccess && <div className="text-green-600 mt-2">{orderSuccess}</div>}
          </div>

          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg w-full mb-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setModalOpen(true)}
            disabled={cartItems.length === 0 || hasUnavailableItem}
            data-aos="fade-up" data-aos-duration="1000" data-aos-delay="250"
          >
            {hasUnavailableItem ? 'some item is not available' : 'Add New Address & Order'}
          </button>
          {orderError && <div className="text-red-500 mt-2">{orderError}</div>}
          {orderSuccess && <div className="text-green-600 mt-2">{orderSuccess}</div>}
        </div>
      </div>

      {/* Modal */}
      <Modal className='mx-3' open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-lg shadow-lg p-6 outline-none max-h-[90vh] overflow-auto ">
          <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-300">Add New Address & Order</h3>
          {hasUnavailableItem && (
            <div className="mb-4 p-3 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border border-red-200 dark:border-red-800">
              Some items are not available: {unavailableItemNames.join(', ')}
            </div>
          )}
          <form onSubmit={handleModalOrder} className="space-y-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={newAddress.fullName}
              onChange={handleModalInput}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              name="streetAddress"
              placeholder="Street Address"
              value={newAddress.streetAddress}
              onChange={handleModalInput}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={newAddress.city}
              onChange={handleModalInput}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              value={newAddress.state}
              onChange={handleModalInput}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={newAddress.country}
              onChange={handleModalInput}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Phone Number"
              value={newAddress.postalCode}
              onChange={handleModalInput}
              required
              className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent text-gray-800 dark:text-gray-100"
            />
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loadingAddressId === 'new' || hasUnavailableItem}
            >
              {loadingAddressId === 'new' ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
              ) : hasUnavailableItem ? (
                'some item is not available'
              ) : (
                'Add Address & Order'
              )}
            </button>
            {orderError && <div className="text-red-500 mt-2">{orderError}</div>}
            {orderSuccess && <div className="text-green-600 mt-2">{orderSuccess}</div>}
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
