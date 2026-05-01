import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  Plus,
  Settings
} from 'lucide-react';

import { 
  fetchProducts, 
  selectInventoryStats,
  selectLowStockProducts 
} from './store/slices/inventorySlice';

import Header from './components/Header';
import StatsCard from './components/StatsCard';
import ProductTable from './components/ProductTable';
import AddProductModal from './components/AddProductModal';
import LowStockAlert from './components/LowStockAlert';
import FilterBar from './components/FilterBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorAlert from './components/ErrorAlert';

function App() {
  const dispatch = useDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showLowStockAlert, setShowLowStockAlert] = useState(true);
  
  const { loading, error } = useSelector(state => state.inventory);
  const stats = useSelector(selectInventoryStats);
  const lowStockProducts = useSelector(selectLowStockProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const statsData = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'blue',
      trend: null
    },
    {
      title: 'Total Stock',
      value: stats.totalStock.toLocaleString(),
      icon: TrendingUp,
      color: 'green',
      trend: null
    },
    {
      title: 'Inventory Value',
      value: `₹${stats.totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`,
      icon: DollarSign,
      color: 'purple',
      trend: null
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockCount,
      icon: AlertTriangle,
      color: 'red',
      trend: stats.lowStockCount > 0 ? 'warning' : null
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence>
            {showLowStockAlert && lowStockProducts.length > 0 && (
              <LowStockAlert 
                products={lowStockProducts}
                onDismiss={() => setShowLowStockAlert(false)}
              />
            )}
          </AnimatePresence>

          {error && <ErrorAlert message={error} />}

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <StatsCard {...stat} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-800">
                Product Inventory
              </h2>
              <p className="text-slate-600 mt-1">
                Manage and track your product catalog
              </p>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              Add Product
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-xl transition-opacity"></div>
            </button>
          </motion.div>

          <FilterBar />

          {loading && !error ? (
            <LoadingSpinner />
          ) : (
            <ProductTable />
          )}
        </main>

        <AddProductModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
