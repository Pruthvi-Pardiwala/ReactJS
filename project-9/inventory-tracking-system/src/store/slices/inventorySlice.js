import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, get, update, remove, onValue, push } from 'firebase/database';
import { database } from '../../firebase/config';

// Async thunks for Firebase operations

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'inventory/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        // Convert object to array with ids
        const productsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        return productsArray;
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add new product
export const addProduct = createAsyncThunk(
  'inventory/addProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const productsRef = ref(database, 'products');
      const newProductRef = push(productsRef);
      
      const product = {
        ...productData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      await set(newProductRef, product);
      
      return {
        id: newProductRef.key,
        ...product
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update product
export const updateProduct = createAsyncThunk(
  'inventory/updateProduct',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const productRef = ref(database, `products/${id}`);
      const updatedData = {
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      await update(productRef, updatedData);
      
      return { id, updates: updatedData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete product
export const deleteProduct = createAsyncThunk(
  'inventory/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const productRef = ref(database, `products/${id}`);
      await remove(productRef);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  products: [],
  loading: false,
  error: null,
  filterCategory: 'all',
  searchQuery: '',
  sortBy: 'name',
  lowStockThreshold: 10,
};

// Inventory slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setLowStockThreshold: (state, action) => {
      state.lowStockThreshold = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], ...action.payload.updates };
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setFilterCategory,
  setSearchQuery,
  setSortBy,
  setLowStockThreshold,
  clearError,
} = inventorySlice.actions;

// Selectors
export const selectFilteredAndSortedProducts = (state) => {
  let filtered = state.inventory.products;

  // Filter by category
  if (state.inventory.filterCategory !== 'all') {
    filtered = filtered.filter(p => p.category === state.inventory.filterCategory);
  }

  // Filter by search query
  if (state.inventory.searchQuery) {
    const query = state.inventory.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.sku?.toLowerCase().includes(query)
    );
  }

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    switch (state.inventory.sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'stock-low':
        return a.stock - b.stock;
      case 'stock-high':
        return b.stock - a.stock;
      // case 'recent':
        // return new Date(b.updatedAt) - new Date(a.updatedAt);
      default:
        return 0;
    }
  });

  return sorted;
};

export const selectLowStockProducts = (state) => {
  return state.inventory.products.filter(
    p => p.stock <= state.inventory.lowStockThreshold
  );
};

export const selectCategories = (state) => {
  const categories = state.inventory.products.map(p => p.category);
  return ['all', ...new Set(categories)];
};

export const selectInventoryStats = (state) => {
  const products = state.inventory.products;
  const lowStock = selectLowStockProducts(state);
  
  return {
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
    lowStockCount: lowStock.length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
  };
};

export default inventorySlice.reducer;
