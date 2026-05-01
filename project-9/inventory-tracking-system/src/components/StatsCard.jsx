import { motion } from 'framer-motion';

function StatsCard({ title, value, icon: Icon, color, trend }) {
  const colorVariants = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-rose-600',
  };

  const bgColorVariants = {
    blue: 'from-blue-50 to-blue-100',
    green: 'from-green-50 to-emerald-100',
    purple: 'from-purple-50 to-purple-100',
    red: 'from-red-50 to-rose-100',
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgColorVariants[color]} rounded-full -mr-16 -mt-16 opacity-50`}></div>
      
      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-600 mb-1">
              {title}
            </p>
            <motion.p 
              className="text-3xl font-display font-bold text-slate-900"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              {value}
            </motion.p>
          </div>
          
          <div className={`p-3 bg-gradient-to-br ${colorVariants[color]} rounded-xl shadow-md`}>
            <Icon size={24} className="text-white" />
          </div>
        </div>

        {trend === 'warning' && (
          <motion.div 
            className="mt-4 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg inline-flex items-center gap-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xs font-semibold text-red-700">Needs attention</span>
          </motion.div>
        )}
      </div>

      <div className={`h-1 bg-gradient-to-r ${colorVariants[color]}`}></div>
    </motion.div>
  );
}

export default StatsCard;
