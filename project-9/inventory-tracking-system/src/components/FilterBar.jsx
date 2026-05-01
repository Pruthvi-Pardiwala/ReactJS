import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import {
  setSearchQuery,
  setFilterCategory,
  setSortBy,
  selectCategories
} from '../store/slices/inventorySlice';

function FilterBar() {
  const dispatch = useDispatch();
  const { searchQuery, filterCategory, sortBy } = useSelector(state => state.inventory);
  const categories = useSelector(selectCategories);

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Search Products
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              placeholder="Search by name, category, SKU..."
              className="w-full pl-10 pr-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <Filter size={16} />
            Filter by Category
          </label>
          <select
            value={filterCategory}
            onChange={(e) => dispatch(setFilterCategory(e.target.value))}
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <ArrowUpDown size={16} />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="w-full px-4 py-2.5 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white appearance-none cursor-pointer"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-low">Price (Low to High)</option>
            <option value="price-high">Price (High to Low)</option>
            <option value="stock-low">Stock (Low to High)</option>
            <option value="stock-high">Stock (High to Low)</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}

export default FilterBar;
