// Cloudinary Configuration
// Get these values from your Cloudinary Dashboard
// https://cloudinary.com/console

export const cloudinaryConfig = {
  cloudName: "dlntihxet",
  uploadPreset: "document_uploads",
};

// Cloudinary upload URL
export const getUploadUrl = () => {
  return `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/upload`;
};

// Helper to get Cloudinary URL for a resource
export const getCloudinaryUrl = (publicId, resourceType = 'auto') => {
  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/${resourceType}/upload/${publicId}`;
};
