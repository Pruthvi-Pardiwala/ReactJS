import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { uploadToCloudinary, getAllDocuments, deleteFromCloudinary } from '../services/cloudinaryService';

// Async Thunks
export const uploadDocument = createAsyncThunk(
  'documents/upload',
  async (file, { rejectWithValue }) => {
    try {
      const document = await uploadToCloudinary(file);
      return document;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDocuments = createAsyncThunk(
  'documents/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const documents = getAllDocuments();
      return documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'documents/delete',
  async ({ publicId, resourceType }, { rejectWithValue }) => {
    try {
      await deleteFromCloudinary(publicId, resourceType);
      return publicId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const documentSlice = createSlice({
  name: 'documents',
  initialState: {
    items: [],
    loading: false,
    error: null,
    uploadProgress: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Upload Document
      .addCase(uploadDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(uploadDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Documents
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.sort((a, b) => 
          new Date(b.uploadDate) - new Date(a.uploadDate)
        );
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Document
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(doc => doc.publicId !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = documentSlice.actions;
export default documentSlice.reducer;
