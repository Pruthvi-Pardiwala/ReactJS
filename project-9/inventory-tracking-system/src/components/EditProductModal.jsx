import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Loader } from 'lucide-react';
import { updateProduct } from '../store/slices/inventorySlice';

function EditProductModal({ isOpen, product, onClose }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sku: '',
    stock: '',
    price: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        sku: product.sku || '',
        stock: product.stock?.toString() || '',
        price: product.price?.toString() || '',
        description: product.description || '',
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (!formData.stock || formData.stock < 0) {
      newErrors.stock = 'Valid stock quantity is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(updateProduct({
        id: product.id,
        updates: {
          name: formData.name.trim(),
          category: formData.category.trim(),
          sku: formData.sku.trim(),
          stock: parseInt(formData.stock),
          price: parseFloat(formData.price),
          description: formData.description.trim(),
        }
      })).unwrap();

      onClose();
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
              >
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Save size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white">
                        Edit Product
                      </h2>
                      <p className="text-purple-100 text-sm">
                        Update product details
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-slate-200 focus:border-purple-500'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Category *
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.category 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-slate-200 focus:border-purple-500'
                        }`}
                      />
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        SKU
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        min="0"
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.stock 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-slate-200 focus:border-purple-500'
                        }`}
                      />
                      {errors.stock && (
                        <p className="mt-1 text-sm text-red-600">{errors.stock}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        className={`w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.price 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-slate-200 focus:border-purple-500'
                        }`}
                      />
                      {errors.price && (
                        <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-6 py-2.5 text-slate-700 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader size={18} className="animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save size={18} />
                          Update Product
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EditProductModal;
