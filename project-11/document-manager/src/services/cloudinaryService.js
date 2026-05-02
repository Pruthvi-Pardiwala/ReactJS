import axios from 'axios';
import { getUploadUrl, cloudinaryConfig, getCloudinaryUrl } from '../config/cloudinary';

// Local storage key for documents
const STORAGE_KEY = 'cloudinary_documents';

// Get all documents from localStorage
export const getAllDocuments = () => {
  try {
    const docs = localStorage.getItem(STORAGE_KEY);
    return docs ? JSON.parse(docs) : [];
  } catch (error) {
    console.error('Error reading documents:', error);
    return [];
  }
};

// Save documents to localStorage
const saveDocuments = (documents) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
  } catch (error) {
    console.error('Error saving documents:', error);
  }
};

// Upload file to Cloudinary
export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryConfig.uploadPreset);
  
  // Determine resource type based on file type
  let resourceType = 'auto';
  if (file.type.startsWith('image/')) {
    resourceType = 'image';
  } else if (file.type === 'application/pdf') {
    resourceType = 'image'; // PDF preview
  } else if (file.type.startsWith('video/')) {
    resourceType = 'video';
  } else {
    resourceType = 'raw'; // For documents, spreadsheets, etc.
  }
  
  formData.append('resource_type', resourceType);
  
  try {
    const response = await axios.post(getUploadUrl(), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    const { public_id, secure_url, format, bytes, created_at, resource_type: uploadedType } = response.data;
    
    // Create document object
    const document = {
      id: public_id,
      publicId: public_id,
      name: file.name,
      type: file.type,
      size: bytes,
      uploadDate: created_at,
      downloadURL: secure_url,
      format: format,
      resourceType: uploadedType,
      cloudinaryUrl: getCloudinaryUrl(public_id, uploadedType),
    };
    
    // Save to localStorage
    const existingDocs = getAllDocuments();
    const updatedDocs = [document, ...existingDocs];
    saveDocuments(updatedDocs);
    
    return document;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(error.response?.data?.error?.message || 'Upload failed');
  }
};

// Delete file from Cloudinary
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  // Note: Deletion requires server-side implementation with Cloudinary API
  // For now, we'll just remove from localStorage
  // In production, you'd call your backend API to delete from Cloudinary
  
  try {
    const existingDocs = getAllDocuments();
    const updatedDocs = existingDocs.filter(doc => doc.publicId !== publicId);
    saveDocuments(updatedDocs);
    
    // Optional: Call your backend to delete from Cloudinary
    // await axios.delete(`/api/cloudinary/delete`, { data: { publicId, resourceType } });
    
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    throw new Error('Delete failed');
  }
};

// Get optimized URL for images
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const { width = 400, height = 400, crop = 'limit', quality = 'auto' } = options;
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/w_${width},h_${height},c_${crop},q_${quality}/${publicId}`;
};

// Get thumbnail URL
export const getThumbnailUrl = (publicId, resourceType = 'image') => {
  if (resourceType === 'raw') {
    // For non-image files, return a placeholder or file type icon
    return null;
  }
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/${resourceType}/upload/w_200,h_200,c_fill/${publicId}`;
};
