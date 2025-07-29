import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Modal, Box, Avatar } from '@mui/material';
import { Add, Remove, Delete, ShoppingCart, LocationOn } from '@mui/icons-material';
import {
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  fetchCart,
  setDeliveryType,
} from '../../connect/state/cart/actions';
import { createOrder } from '../../connect/state/order/actions';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const cartLoading = useSelector((state) => state.cart.loading);
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
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [orderSuccess, setOrderSuccess] = useState('');



  const cartItems = cart?.items || [];
  const totalQuantity = cart?.totalItems || 0;
  const totalPrice = cart?.totalPrice || 0;
  const deliveryFee = cart?.deliveryFee || 0;
  const total = cart?.total || 0;




  
  const restaurantId = cartItems[0]?.food?.restaurant?._id;

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

  
  const handleAdd = (item) => {
    dispatch(updateCartItemQuantity({ cartItemId: item._id, quantity: item.quantity + 1 }));
  };
  const handleReduce = (item) => {
    if (item.quantity <= 1) {
      dispatch(removeCartItem(item._id));
    } else {
      dispatch(updateCartItemQuantity({ cartItemId: item._id, quantity: item.quantity - 1}));
    }
  };
  const handleRemove = (item) => {
    dispatch(removeCartItem(item._id));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  
  const handleOrder = async (address) => {
    if (!restaurantId) {
      setOrderError('No restaurant found in cart.');
      return;
    }
  
    const deliveryAddress = address._id ? { _id: address._id } : address;

  
    setOrderLoading(true);
    setOrderError('');
    setOrderSuccess('');
    try {
      await dispatch(
        createOrder({
          restaurantId,
          deliveryAddress
        })
      );
      setOrderSuccess('Order placed successfully!');
      dispatch(clearCart());
      dispatch(fetchCart());
      setModalOpen(false);
    } catch (err) {
      setOrderError('Failed to place order.');
    } finally {
      setOrderLoading(false);
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
    <div className="mt-16 pt-8 px-2 md:px-8 lg:px-20 min-h-screen bg-gray-50 dark:bg-black transition-colors">
      <div className="flex flex-col lg:flex-row gap-8 pt-10 px-4 pb-20 justify-center items-center">
        {/* Cart Details */}
        <div className="flex-1 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 rounded-lg shadow p-16">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-300">
            <ShoppingCart /> Cart Details
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">Your cart is empty.</div>
          ) : (
            <>
              <div className="space-y-12 py-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-8 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 "
                  >
                    <img
                      src={item.food.images[0]}
                      alt={item.food.name}
                      className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">{item.food.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">₦{item.food.price}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <IconButton size="small" onClick={() => handleReduce(item)}>
                          <Remove className="text-orange-600" />
                        </IconButton>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <IconButton size="small" onClick={() => handleAdd(item)}>
                          <Add className="text-orange-600" />
                        </IconButton>
                        
                      </div>
                    </div>
                    <div className="font-bold text-orange-600 dark:text-orange-300 text-lg flex-col items-center gap-10">
                      <div >
                        <IconButton size="small" onClick={() => handleRemove(item)}>
                          <Delete className="text-red-500" />
                        </IconButton>
                      </div>
                       <div>
                       ₦{(item.totalPrice).toFixed(2)}
                       </div>
                      </div>
                  </div>
                ))}
              </div>
              <div className=" flex flex-col md:flex-row md:items-center md:justify-between mt-8 gap-4">
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
                    <option  value="IN_CAMPUS">In-Campus (₦300)</option>
                    <option value="OFF_CAMPUS">Off-Campus (₦500)</option>
                  </select>
                </div>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                  onClick={handleClearCart}
                  disabled={cartLoading}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>

        
        <div className="flex-1 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 rounded-lg shadow p-14">
          <h2 className=" text-2xl font-bold mb-4 flex items-center gap-2 text-orange-600 dark:text-orange-300">
            <LocationOn /> Delivery Address
          </h2>
          {addresses.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-400 mb-4 ">No saved addresses found.</div>
          ) : (
            <div className="space-y-10 mb-6">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className=" border border-gray-200 dark:border-gray-700 rounded-lg p-6 flex flex-col md:flex-row items-center md:justify-between gap-6"
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
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    onClick={() => handleOrder(address)}
                    disabled={orderLoading || cartItems.length === 0}
                  >
                    { orderLoading ? 'Ordering...' : 'Select & Order'}
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg w-full mb-2"
            onClick={() => setModalOpen(true)}
            disabled={cartItems.length === 0}
          >
            Add New Address & Order
          </button>
          {orderError && <div className="text-red-500 mt-2">{orderError}</div>}
          {orderSuccess && <div className="text-green-600 mt-2">{orderSuccess}</div>}
        </div>
      </div>

      
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-black dark:border-[0.5px] dark:border-orange-300 rounded-lg shadow-lg p-8 outline-none">
          <h3 className="text-xl font-bold mb-4 text-orange-600 dark:text-orange-300">Add New Address & Order</h3>
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
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-lg w-full"
              disabled={orderLoading}
            >
              {orderLoading ? 'Ordering...' : 'Add Address & Order'}
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