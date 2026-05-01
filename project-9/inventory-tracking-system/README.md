# 🏪 InventoryFlow - Real-Time Inventory Tracking System

A modern, production-ready inventory management system built with React, Redux Toolkit, and Firebase Realtime Database. Features real-time synchronization, advanced filtering, and a beautiful, responsive UI.

![Tech Stack](https://img.shields.io/badge/React-18.2-blue)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.2-purple)
![Firebase](https://img.shields.io/badge/Firebase-10.8-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-cyan)

## ✨ Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, Delete products with real-time sync
- 🔄 **Real-Time Updates**: Instant synchronization across all connected clients
- 🔍 **Advanced Search**: Search by product name, category, or SKU
- 🏷️ **Category Filtering**: Filter products by category
- 📊 **Multiple Sort Options**: Sort by name, price, stock, or last updated
- ⚠️ **Low Stock Alerts**: Automatic alerts for products below threshold
- 📈 **Dashboard Analytics**: Real-time stats and inventory insights

### User Experience
- 🎨 **Modern UI**: Beautiful gradient designs with smooth animations
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Loading States**: Proper loading indicators for all async operations
- 🚨 **Error Handling**: Graceful error messages and recovery
- 🎭 **Smooth Animations**: Powered by Framer Motion

### Technical Features
- 🏗️ **Redux Toolkit**: Efficient state management with async thunks
- 🔥 **Firebase Realtime DB**: Serverless backend with automatic scaling
- 📦 **Component Architecture**: Modular, reusable components
- 🎯 **TypeScript Ready**: Easy to convert to TypeScript
- 🚀 **Optimized Build**: Vite for lightning-fast development

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Firebase account (free tier works)

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd inventory-tracking-system

# Install dependencies
npm install
```

### 2. Run the Application

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
inventory-tracking-system/
├── src/
│   ├── components/           # React components
│   │   ├── Header.jsx
│   │   ├── StatsCard.jsx
│   │   ├── ProductTable.jsx
│   │   ├── FilterBar.jsx
│   │   ├── AddProductModal.jsx
│   │   ├── EditProductModal.jsx
│   │   ├── DeleteConfirmModal.jsx
│   │   ├── LowStockAlert.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorAlert.jsx
│   │
│   ├── store/               # Redux store configuration
│   │   ├── store.js         # Store setup
│   │   └── slices/
│   │       └── inventorySlice.js  # Inventory state & thunks
│   │
│   ├── firebase/            # Firebase configuration
│   │   └── config.js
│   │
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
│
├── public/                  # Static assets
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── postcss.config.js       # PostCSS config
└── .env                    # Environment variables (create this)
```

## 🎯 Usage Guide

### Adding a Product
1. Click the **"Add Product"** button
2. Fill in the product details:
   - Product Name (required)
   - Category (required)
   - SKU (auto-generated if empty)
   - Stock Quantity (required)
   - Price (required)
   - Description (optional)
3. Click **"Add Product"**

### Editing a Product
1. Click the **edit icon** (pencil) on any product row
2. Update the desired fields
3. Click **"Update Product"**

### Deleting a Product
1. Click the **delete icon** (trash) on any product row
2. Confirm the deletion
3. Product is removed from all clients instantly

### Filtering & Searching
- **Search**: Type in the search box to filter by name, category, or SKU
- **Category Filter**: Select a category from the dropdown
- **Sort**: Choose sorting method (name, price, stock, etc.)

### Low Stock Management
- Products below the threshold (default: 10) show warnings
- Low stock alert banner appears at the top
- Configure threshold in Redux state if needed

## 🔧 Configuration

### Low Stock Threshold
Edit `src/store/slices/inventorySlice.js`:
```javascript
const initialState = {
  // ... other state
  lowStockThreshold: 10, // Change this value
};
```

### Customize Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    // Your custom color palette
  }
}
```

### Firebase Security Rules (Production)
```json
{
  "rules": {
    "products": {
      ".read": "auth != null",
      ".write": "auth != null",
      "$productId": {
        ".validate": "newData.hasChildren(['name', 'category', 'stock', 'price']) && newData.child('stock').isNumber() && newData.child('price').isNumber()"
      }
    }
  }
}
```

## 📊 Redux State Structure

```javascript
{
  inventory: {
    products: [],           // Array of products
    loading: false,         // Loading state
    error: null,           // Error message
    filterCategory: 'all', // Current category filter
    searchQuery: '',       // Current search query
    sortBy: 'name',        // Current sort method
    lowStockThreshold: 10  // Low stock threshold
  }
}
```

## 🔄 Real-Time Synchronization

Firebase Realtime Database ensures:
- **Instant Updates**: Changes sync across all connected clients
- **Offline Support**: Local caching when offline
- **Automatic Reconnection**: Handles network interruptions gracefully
- **Scalability**: Handles thousands of concurrent connections

## 🛠️ Tech Stack Details

| Technology | Purpose |
|-----------|---------|
| **React 18.2** | UI library with hooks |
| **Vite 5.1** | Build tool & dev server |
| **Redux Toolkit 2.2** | State management |
| **Firebase 10.8** | Realtime database backend |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion 11** | Animation library |
| **Lucide React** | Icon library |

## 📈 Performance Optimizations

- ✅ Component-level code splitting
- ✅ Memoized selectors in Redux
- ✅ Debounced search inputs
- ✅ Optimized re-renders with React.memo
- ✅ Lazy loading for modals
- ✅ Vite's optimized production build

## 🔒 Security Best Practices

1. **Never commit `.env` file** - Add to `.gitignore`
2. **Use Firebase Security Rules** - Restrict database access
3. **Validate inputs** - Client-side and server-side validation
4. **Enable Firebase Authentication** - For production apps
5. **Rate limiting** - Prevent abuse with Firebase rules

## 🐛 Troubleshooting

### Firebase Connection Issues
```javascript
// Check your database URL format
// Should be: https://PROJECT_ID-default-rtdb.firebaseio.com
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Working
```bash
# Restart dev server after changing .env
npm run dev
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 💡 Future Enhancements

- [ ] User authentication
- [ ] Product images upload
- [ ] Export to Excel/CSV
- [ ] Email notifications for low stock
- [ ] Barcode scanning
- [ ] Multi-warehouse support
- [ ] Sales tracking
- [ ] Purchase orders
- [ ] Supplier management
- [ ] Analytics dashboard

## 📧 Support

For issues or questions:
- Open an issue on GitHub
- Check Firebase documentation
- Review Redux Toolkit docs

---

Built with ❤️ using React, Redux Toolkit, and Firebase
