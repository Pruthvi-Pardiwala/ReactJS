## Book Store Manager

A simple React + Vite + Bootstrap app to manage books with full CRUD functionality and local storage persistence.

### Screenshot

<img width="100%" alt="book-store" src="./screenshots/home.png" />

---

### Tech stack

- **React** (with Hooks)
- **Vite** for bundling/dev server
- **React Router DOM** for routing
- **Bootstrap 5** and **react-bootstrap** for UI
- **localStorage** for data persistence
- **UUID** for unique book IDs

---

### Features

- Add new books with title, author, type, and price
- Edit existing book details
- Delete books with confirmation
- View all books in a responsive table
- Search books by title, author, or type
- Filter books by category/type
- Sort books by title and price
- Persistent data using `localStorage`

---

### Getting started

1. **Install dependencies**

```bash
npm install
```
2. **Run the dev server**
   
 ```bash
 npm run dev
 ```
3. **Open the URL shown in the terminal (usually http://localhost:5173)**
### Available scripts
 - npm run dev: Start Vite dev server
 - npm run build: Build for production
 - npm run preview: Preview the production build locally
 - npm run lint: Run ESLint
### Project structure (src)
 - App.jsx – Main app component and routing setup
 - App.css – Global styling
 - components/AppLayout.jsx – Layout wrapper
 - components/BookForm.jsx – Add/Edit book form
 - pages/HomePage.jsx – Home page
 - pages/AddBookPage.jsx – Add book page
 - pages/EditBookPage.jsx – Edit book page
 - pages/ViewBooksPage.jsx – List, search, filter, sort
 - lib/booksStorage.js – localStorage CRUD logic
How it works
Books are stored in browser localStorage
On first load, sample data is added
CRUD operations are handled via utility functions:
addBook()
getBooks()
updateBook()
deleteBook()
Validation rules
Title → Required
Author → Required
Type → Required
Price → Must be greater than 0
Future improvements
Add backend (Node.js + MongoDB)
User authentication
Pagination for large datasets
Image upload for book covers
Dark mode support
Author

Pruthvi Pardiwala

GitHub: https://github.com/your-username
LinkedIn: https://linkedin.com/in/your-profile
License

MIT License


---

If you want, I can also:
- convert this into a **super clean one-page portfolio README**
- or make both projects follow a **consistent GitHub style (very important for recruiters)**
