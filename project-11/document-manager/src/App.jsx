import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDocuments } from './store/documentSlice';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import DocumentList from './components/DocumentList';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <motion.div
          className="container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <UploadZone />
          
          {error && (
            <motion.div
              className="error-banner"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <DocumentList />
        </motion.div>
      </main>

      <footer className="app-footer">
        <p>Built with React, Redux Toolkit & Firebase Storage</p>
      </footer>
    </div>
  );
}

export default App;
