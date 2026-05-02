import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteDocument } from '../store/documentSlice';
import { Download, Trash2, Eye, FileText, Image as ImageIcon, Table, Presentation, File } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatFileSize, isImageFile, isPdfFile, getFileCategory } from '../utils/fileUtils';
import { format } from 'date-fns';

const DocumentCard = ({ document }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteDocument({ 
      publicId: document.publicId, 
      resourceType: document.resourceType 
    }));
    setDeleteConfirm(false);
  };

  const handleDownload = () => {
    const link = window.document.createElement('a');
    link.href = document.downloadURL;
    link.download = document.name;
    link.click();
  };

  const getIcon = () => {
    const category = getFileCategory(document.type);
    const iconProps = { size: 32, strokeWidth: 1.5 };
    
    switch (category) {
      case 'Image':
        return <ImageIcon {...iconProps} />;
      case 'PDF':
        return <FileText {...iconProps} />;
      case 'Spreadsheet':
        return <Table {...iconProps} />;
      case 'Presentation':
        return <Presentation {...iconProps} />;
      default:
        return <File {...iconProps} />;
    }
  };

  return (
    <>
      <motion.div
        className="document-card"
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -4 }}
      >
        <div className="card-header">
          <div className="file-icon-wrapper">
            {getIcon()}
          </div>
          <span className="file-category">{getFileCategory(document.type)}</span>
        </div>

        <div className="card-body">
          <h4 className="document-name" title={document.name}>
            {document.name}
          </h4>
          <div className="document-meta">
            <span>{formatFileSize(document.size)}</span>
            <span>•</span>
            <span>{format(new Date(document.uploadDate), 'MMM d, yyyy')}</span>
          </div>
        </div>

        <div className="card-actions">
          {(isImageFile(document.type) || isPdfFile(document.type)) && (
            <button
              onClick={() => setShowPreview(true)}
              className="action-btn"
              title="Preview"
            >
              <Eye size={18} />
            </button>
          )}
          <button
            onClick={handleDownload}
            className="action-btn"
            title="Download"
          >
            <Download size={18} />
          </button>
          <button
            onClick={() => setDeleteConfirm(true)}
            className="action-btn delete-btn"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPreview(false)}
          >
            <motion.div
              className="modal-content preview-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{document.name}</h3>
                <button onClick={() => setShowPreview(false)} className="close-btn">
                  ×
                </button>
              </div>
              <div className="preview-container">
                {isImageFile(document.type) ? (
                  <img src={document.downloadURL} alt={document.name} />
                ) : isPdfFile(document.type) ? (
                  <iframe src={document.downloadURL} title={document.name} />
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDeleteConfirm(false)}
          >
            <motion.div
              className="modal-content delete-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Delete Document?</h3>
              <p>Are you sure you want to delete <strong>{document.name}</strong>?</p>
              <p className="warning-text">This action cannot be undone.</p>
              <div className="modal-actions">
                <button onClick={() => setDeleteConfirm(false)} className="btn-cancel">
                  Cancel
                </button>
                <button onClick={handleDelete} className="btn-delete">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DocumentCard;
