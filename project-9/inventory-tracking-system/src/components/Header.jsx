import { motion } from 'framer-motion';
import { Package2, Sparkles } from 'lucide-react';

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl blur opacity-50"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 p-2.5 rounded-xl shadow-lg">
                <Package2 size={24} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                InventoryFlow
              </h1>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <Sparkles size={10} className="text-blue-500" />
                Real-time tracking
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-green-700">Connected</span>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default Header;
