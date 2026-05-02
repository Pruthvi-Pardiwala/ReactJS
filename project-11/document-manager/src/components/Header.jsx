import { Moon, Sun, FolderKanban } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="app-header">
      <div className="header-content">
        <motion.div
          className="logo"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <FolderKanban size={32} strokeWidth={1.5} />
          <div className="logo-text">
            <h1>DocuVault</h1>
            <span className="tagline">Digital Document Manager</span>
          </div>
        </motion.div>

        <motion.button
          className="theme-toggle"
          onClick={toggleTheme}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
