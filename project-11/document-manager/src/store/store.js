import { configureStore } from '@reduxjs/toolkit';
import documentReducer from './documentSlice';

export const store = configureStore({
  reducer: {
    documents: documentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
