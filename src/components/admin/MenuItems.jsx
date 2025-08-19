import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  Modal, 
  Box, 
  Typography
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModeContext } from '../Mode';
import { fetchMyRestaurant } from '../../connect/state/restaurant/actions';
import { 
  fetchMenuItems, 
  createMenuItem, 
  deleteMenuItem, 
  updateItemAvailability 
} from '../../connect/state/menu/actions';
import { fetchAdminCategories } from '../../connect/state/category/actions';

const MenuItems = () => {
  const dispatch = useDispatch();
  const { myRestaurant, loading: restaurantLoading } = useSelector(state => state.restaurant);
  const { menuItems, loading: menuLoading } = useSelector(state => state.menu);
  const { categories, loading: categoriesLoading } = useSelector(state => state.category);
 
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [imageInputType, setImageInputType] = useState('file'); 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: null,
    imageUrl: '',
    isAvailable: true
  });
  const [togglingItemId, setTogglingItemId] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [confirmDeleteLoading, setConfirmDeleteLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
      dispatch(fetchMyRestaurant());
      dispatch(fetchAdminCategories());
  }, [dispatch]);

  useEffect(() => {
      if (myRestaurant?._id) {
        dispatch(fetchMenuItems(myRestaurant._id));
      }
  }, [dispatch, myRestaurant]);


  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!myRestaurant?._id) {
      console.error("No restaurant ID available");
      return;
    }
  
    try {
      setIsSubmitting(true);
      let imageUrls = [];
  
      if (imageInputType === "file" && formData.image) {
        const data = new FormData();
        data.append("file", formData.image);
        data.append("upload_preset", "restaurant"); 
  
        const cloudinaryRes = await fetch(
          "https://api.cloudinary.com/v1_1/dxabwapvs/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
  
        const cloudinaryData = await cloudinaryRes.json();
        if (cloudinaryData.secure_url) {
          imageUrls.push(cloudinaryData.secure_url);
        } else {
          throw new Error("Image upload to Cloudinary failed");
        }
      } 
      else if (imageInputType === "url" && formData.imageUrl) {
        imageUrls.push(formData.imageUrl);
      }
  
      const menuItemData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        restaurant: myRestaurant._id,
        images: imageUrls, 
        available: formData.isAvailable
      };
  
      await dispatch(createMenuItem(menuItemData));
      await dispatch(fetchMenuItems(myRestaurant._id));
  
      setShowAddModal(false);
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        imageUrl: "",
        isAvailable: true
      });
      setImageInputType("file");
      setIsSubmitting(false);
  
    } catch (error) {
      console.error("Error saving menu item:", error);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        setConfirmDeleteLoading(true);
        setDeletingItemId(itemToDelete);
        await dispatch(deleteMenuItem(itemToDelete));
        if (myRestaurant?._id) {
          await dispatch(fetchMenuItems(myRestaurant._id));
        }
      } catch (error) {
        console.error('Error deleting menu item:', error);
      } finally {
        setConfirmDeleteLoading(false);
        setDeletingItemId(null);
        setShowDeleteDialog(false);
        setItemToDelete(null);
      }
    }
  };

  const toggleAvailability = async (itemId, currentStatus) => {
    try {
      setTogglingItemId(itemId);
      await dispatch(updateItemAvailability(itemId, !currentStatus));
      
    } catch (error) {
      console.error('Error updating availability:', error);
    } finally {
      setTogglingItemId(null);
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories?.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const displayMenuItems = menuItems?.length > 0 ? menuItems : [];
  
  const isInitialMenuLoading = menuLoading && (!menuItems || menuItems.length === 0);
  const isInitialCategoriesLoading = categoriesLoading && (!categories || categories.length === 0);
  const isLoading = restaurantLoading || isInitialMenuLoading || isInitialCategoriesLoading;
  

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Menu Items</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
        >
          <AddIcon /> Add Item
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 animate-pulse">
              <div className="mb-3">
                <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              </div>
              <div className="flex justify-between items-start mb-3">
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-6 w-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayMenuItems?.map((item) => (
            <div key={item._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              {item.images && item.images.length > 0 && (
                <div className="mb-3">
                  <img 
                    src={item.images[0]} 
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={deletingItemId === item._id}
                    className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded disabled:opacity-50"
                  >
                    {deletingItemId === item._id ? (
                      <span className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin inline-block"></span>
                    ) : (
                      <DeleteIcon />
                    )}
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{item.description}</p>
              <p className="text-orange-600 font-semibold mb-2">₦{item.price}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                Category: {getCategoryName(item.category || item.foodCategory)}
              </p>
              
              <div className="flex justify-between items-center">
                <span className={`px-4 py-2 rounded-full text-xs font-medium ${
                  item.available 
                    ? 'bg-green-500 text-white' 
                    : 'bg-black text-green-500'
                }`}>
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
                <button
                  onClick={() => toggleAvailability(item._id, item.available)}
                  disabled={togglingItemId === item._id}
                  className={`px-3 py-1 rounded text-sm font-medium transition disabled:opacity-50 ${
                    item.available
                      ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200'
                      : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                  }`}
                >
                  {togglingItemId === item._id ? (
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin inline-block"></span>
                  ) : (
                    item.available ? 'Disable' : 'Enable'
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: null,
            imageUrl: '',
            isAvailable: true
          });
          setImageInputType('file');
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={`absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-lg shadow-lg p-6 outline-none max-h-[90vh] overflow-auto`}>
          <div className="flex justify-between items-center mb-6">
            <Typography id="modal-title" variant="h6" component="h2" className="text-gray-900 dark:text-white text-xl font-semibold">
              Add Menu Item
            </Typography>
            <button
              onClick={() => {
                setShowAddModal(false);
                setFormData({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  image: null,
                  imageUrl: '',
                  isAvailable: true
                });
                setImageInputType('file');
              }}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <CloseIcon />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter item name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-vertical"
                placeholder="Enter item description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Category</option>
                {categories?.map((category) => (
                  <option key={category._id} value={category._id} className="text-gray-900 dark:text-white">
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Image
              </label>
              
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => {
                    setImageInputType('file');
                    setFormData({ ...formData, imageUrl: '' });
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    imageInputType === 'file'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImageInputType('url');
                    setFormData({ ...formData, image: null });
                  }}
                  className={`flex-1 px-3 py-2 text-sm font-medium transition-colors ${
                    imageInputType === 'url'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  Image URL
                </button>
              </div>

              {imageInputType === 'file' ? (
                <div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                </div>
              ) : (
                <div>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Available
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  'Add Item'
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({
                    name: '',
                    description: '',
                    price: '',
                    category: '',
                    image: null,
                    imageUrl: '',
                    isAvailable: true
                  });
                  setImageInputType('file');
                }}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this menu item? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={confirmDeleteLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
              >
                {confirmDeleteLoading ? (
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block"></span>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItems; 