import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

function LoadingSpinner() {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
        <Loader2 size={48} className="relative text-blue-600 animate-spin" />
      </div>
      <p className="mt-4 text-slate-600 font-medium">Loading products...</p>
    </motion.div>
  );
}

export default LoadingSpinner;
