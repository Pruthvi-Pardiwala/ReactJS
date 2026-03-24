import { useMemo, useState } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { BookForm } from '../components/BookForm.jsx'
import { getBookById, updateBook } from '../lib/booksStorage.js'

export function EditBookPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)

  const book = useMemo(() => (id ? getBookById(id) : null), [id])

  if (!book) {
    return (
      <Alert variant="warning" className="shadow-sm">
        <div className="d-flex align-items-center justify-content-between gap-3">
          <div>
            <div className="fw-semibold mb-1">Book not found</div>
            <div className="text-body-secondary">
              The book you’re trying to edit doesn’t exist.
            </div>
          </div>
          <Button variant="outline-secondary" onClick={() => navigate('/books')}>
            Back
          </Button>
        </div>
      </Alert>
    )
  }

  function handleSubmit(values) {
    setBusy(true)
    try {
      updateBook(book.id, values)
      navigate('/books')
    } finally {
      setBusy(false)
    }
  }

  return (
    <BookForm
      title="Edit Book"
      submitLabel="Save Changes"
      initialValue={book}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/books')}
      busy={busy}
    />
  )
}

