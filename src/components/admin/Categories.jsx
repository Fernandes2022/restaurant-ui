import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import { 
  Modal, 
  Box, 
  Typography, 
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ModeContext } from '../Mode';
import { fetchAdminCategories, addCategory, updateCategory, deleteCategory } from '../../connect/state/category/actions';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.category);
  const { theme } = useContext(ModeContext);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    dispatch(fetchAdminCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'image' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        name: formData.name
      };

      if (editingCategory) {
        await dispatch(updateCategory(editingCategory._id, submitData));
      } else {
        await dispatch(addCategory(submitData));
      }

      setShowAddModal(false);
      setEditingCategory(null);
      setFormData({
        name: ''
      });
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name
    });
    setShowAddModal(true);
  };

  const handleDelete = async (categoryId) => {
    setCategoryToDelete(categoryId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await dispatch(deleteCategory(categoryToDelete));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
    setShowDeleteDialog(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Categories Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
        >
          <AddIcon /> Add Category
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">Loading categories...</p>
        </div>
      )}

      {/* Categories List */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories?.map((category) => (
            <div key={category._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
            </div>
          ))}
        </div>
      )}

      {!loading && categories?.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">No categories found. Create your first category to get started.</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCategory(null);
          setFormData({
            name: ''
          });
        }}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className={`absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 dark:border dark:border-gray-700 rounded-lg shadow-lg p-6 outline-none max-h-[90vh] overflow-auto`}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography id="modal-title" variant="h6" component="h2" className="text-gray-900 dark:text-white">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </Typography>
            <IconButton
              onClick={() => {
                setShowAddModal(false);
                setEditingCategory(null);
                setFormData({
                  name: ''
                });
              }}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter category name"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                {editingCategory ? 'Update' : 'Add'} Category
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCategory(null);
                  setFormData({
                    name: ''
                  });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
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
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete this category? This will also affect all menu items in this category. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories; 