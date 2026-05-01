import { motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { clearError } from '../store/slices/inventorySlice';

function ErrorAlert({ message }) {
  const dispatch = useDispatch();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 mb-6 shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 bg-red-100 rounded-xl flex-shrink-0">
          <AlertCircle size={24} className="text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-red-900 mb-1">
            Error
          </h3>
          <p className="text-red-800">
            {message || 'An error occurred. Please try again.'}
          </p>
        </div>
        <button
          onClick={() => dispatch(clearError())}
          className="p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
        >
          <X size={20} className="text-red-600" />
        </button>
      </div>
    </motion.div>
  );
}

export default ErrorAlert;
