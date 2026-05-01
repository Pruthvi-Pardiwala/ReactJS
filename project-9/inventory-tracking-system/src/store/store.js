import { configureStore } from '@reduxjs/toolkit';
import inventoryReducer from './slices/inventorySlice';

export const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Firebase timestamps may not be serializable
    }),
});

export default store;
