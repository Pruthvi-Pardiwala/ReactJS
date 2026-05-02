import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentCard from './DocumentCard';
import { Loader2, FolderOpen } from 'lucide-react';

const DocumentList = () => {
  const { items, loading, error } = useSelector((state) => state.documents);

  if (loading && items.length === 0) {
    return (
      <div className="loading-state">
        <Loader2 className="spinner" size={48} />
        <p>Loading documents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FolderOpen size={64} strokeWidth={1.5} />
        <h3>No documents yet</h3>
        <p>Upload your first document to get started</p>
      </motion.div>
    );
  }

  return (
    <div className="documents-section">
      <div className="section-header">
        <h2>Your Documents</h2>
        <span className="document-count">{items.length} {items.length === 1 ? 'file' : 'files'}</span>
      </div>
      
      <motion.div
        className="document-grid"
        layout
      >
        <AnimatePresence mode="popLayout">
          {items.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DocumentList;
