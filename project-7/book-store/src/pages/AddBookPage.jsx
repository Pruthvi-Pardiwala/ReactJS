import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookForm } from '../components/BookForm.jsx'
import { addBook } from '../lib/booksStorage.js'

export function AddBookPage() {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  function handleSubmit(values) {
    setBusy(true)
    try {
      addBook(values)
      navigate('/books')
    } finally {
      setBusy(false)
    }
  }

  return (
    <BookForm
      title="Add Book"
      submitLabel="Add Book"
      onSubmit={handleSubmit}
      onCancel={() => navigate('/books')}
      busy={busy}
    />
  )
}

