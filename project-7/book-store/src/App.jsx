import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { AppLayout } from './components/AppLayout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { AddBookPage } from './pages/AddBookPage.jsx'
import { ViewBooksPage } from './pages/ViewBooksPage.jsx'
import { EditBookPage } from './pages/EditBookPage.jsx'
import { ensureSeedBooks } from './lib/booksStorage.js'

export default function App() {
  ensureSeedBooks()

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/books" element={<ViewBooksPage />} />
          <Route path="/books/new" element={<AddBookPage />} />
          <Route path="/books/:id/edit" element={<EditBookPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
