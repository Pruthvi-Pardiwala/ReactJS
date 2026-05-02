export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const getFileIcon = (type) => {
  if (type.startsWith('image/')) return 'Image';
  if (type === 'application/pdf') return 'FileText';
  if (type.includes('document') || type.includes('word')) return 'FileText';
  if (type.includes('sheet') || type.includes('excel')) return 'Table';
  if (type.includes('presentation') || type.includes('powerpoint')) return 'Presentation';
  return 'File';
};

export const isImageFile = (type) => {
  return type.startsWith('image/');
};

export const isPdfFile = (type) => {
  return type === 'application/pdf';
};

export const getFileCategory = (type) => {
  if (type.startsWith('image/')) return 'Image';
  if (type === 'application/pdf') return 'PDF';
  if (type.includes('document') || type.includes('word')) return 'Document';
  if (type.includes('sheet') || type.includes('excel')) return 'Spreadsheet';
  if (type.includes('presentation') || type.includes('powerpoint')) return 'Presentation';
  return 'Other';
};
