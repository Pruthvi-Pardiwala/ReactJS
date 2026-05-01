import { motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

function LowStockAlert({ products, onDismiss }) {
  if (products.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-5 mb-6 shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-orange-100 rounded-xl">
            <AlertTriangle size={24} className="text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-lg text-orange-900 mb-1">
              Low Stock Alert
            </h3>
            <p className="text-orange-800 mb-3">
              {products.length} product{products.length !== 1 ? 's' : ''} running low on stock
            </p>
            <div className="flex flex-wrap gap-2">
              {products.slice(0, 5).map(product => (
                <div
                  key={product.id}
                  className="px-3 py-1.5 bg-white rounded-lg border border-orange-200 text-sm"
                >
                  <span className="font-semibold text-slate-900">{product.name}</span>
                  <span className="text-slate-600 mx-2">•</span>
                  <span className="text-orange-700 font-semibold">{product.stock} left</span>
                </div>
              ))}
              {products.length > 5 && (
                <div className="px-3 py-1.5 bg-orange-100 rounded-lg text-sm font-semibold text-orange-700">
                  +{products.length - 5} more
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="p-2 hover:bg-orange-100 rounded-lg transition-colors flex-shrink-0"
        >
          <X size={20} className="text-orange-600" />
        </button>
      </div>
    </motion.div>
  );
}

export default LowStockAlert;
