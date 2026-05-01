import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, Package, AlertCircle } from 'lucide-react';
import { 
  selectFilteredAndSortedProducts,
  deleteProduct 
} from '../store/slices/inventorySlice';
import EditProductModal from './EditProductModal';
import DeleteConfirmModal from './DeleteConfirmModal';

function ProductTable() {
  const dispatch = useDispatch();
  const products = useSelector(selectFilteredAndSortedProducts);
  const { lowStockThreshold } = useSelector(state => state.inventory);
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  const handleDelete = async (id) => {
    await dispatch(deleteProduct(id));
    setDeletingProduct(null);
  };

  const getStockStatusColor = (stock) => {
    if (stock === 0) return 'text-red-700 bg-red-100';
    if (stock <= lowStockThreshold) return 'text-orange-700 bg-orange-100';
    return 'text-green-700 bg-green-100';
  };

  const getStockStatusText = (stock) => {
    if (stock === 0) return 'Out of Stock';
    if (stock <= lowStockThreshold) return 'Low Stock';
    return 'In Stock';
  };

  if (products.length === 0) {
    return (
      <motion.div 
        className="bg-white rounded-2xl shadow-lg p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
          <Package size={32} className="text-slate-400" />
        </div>
        <h3 className="text-xl font-display font-bold text-slate-800 mb-2">
          No products found
        </h3>
        <p className="text-slate-600">
          Try adjusting your filters or add a new product to get started
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        className="bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b-2 border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <AnimatePresence>
                {products.map((product, index) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {product.name}
                          </div>
                          {product.description && (
                            <div className="text-sm text-slate-500 line-clamp-1">
                              {product.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-slate-600">
                        {product.sku || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">
                          {product.stock}
                        </span>
                        {product.stock <= lowStockThreshold && (
                          <AlertCircle size={16} className="text-orange-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStockStatusColor(product.stock)}`}>
                        {getStockStatusText(product.stock)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => setDeletingProduct(product)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{products.length}</span> product{products.length !== 1 ? 's' : ''}
          </p>
        </div>
      </motion.div>

      <EditProductModal
        isOpen={editingProduct !== null}
        product={editingProduct}
        onClose={() => setEditingProduct(null)}
      />

      <DeleteConfirmModal
        isOpen={deletingProduct !== null}
        product={deletingProduct}
        onConfirm={() => handleDelete(deletingProduct.id)}
        onCancel={() => setDeletingProduct(null)}
      />
    </>
  );
}

export default ProductTable;
