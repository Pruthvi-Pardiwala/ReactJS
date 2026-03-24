import { useMemo, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { BOOK_TYPES } from '../lib/booksStorage.js'

function normalizeInitial(v) {
  return {
    title: v?.title ?? '',
    author: v?.author ?? '',
    type: v?.type ?? BOOK_TYPES[0],
    price: v?.price ?? '',
    publishedDate: v?.publishedDate ?? '',
    imageUrl: v?.imageUrl ?? '',
  }
}

export function BookForm({
  title,
  submitLabel,
  initialValue,
  onSubmit,
  onCancel,
  busy = false,
}) {
  const initial = useMemo(() => normalizeInitial(initialValue), [initialValue])
  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({})

  const errors = useMemo(() => {
    const e = {}
    if (!values.title.trim()) e.title = 'Title is required.'
    if (!values.author.trim()) e.author = 'Author is required.'
    if (!values.type.trim()) e.type = 'Type is required.'
    const n = Number(values.price)
    if (Number.isNaN(n) || n <= 0) e.price = 'Price must be greater than 0.'
    return e
  }, [values])

  const canSubmit = Object.keys(errors).length === 0 && !busy

  function setField(name, value) {
    setValues((s) => ({ ...s, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched({
      title: true,
      author: true,
      type: true,
      price: true,
      publishedDate: true,
      imageUrl: true,
    })
    if (!canSubmit) return
    onSubmit({
      ...values,
      price: Number(values.price),
    })
  }

  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
          <div>
            <h2 className="h4 mb-1">{title}</h2>
            <div className="text-body-secondary">
              Fill the details below. After saving, you’ll be redirected to the
              table view.
            </div>
          </div>
        </div>

        <Form onSubmit={handleSubmit} noValidate>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="bookTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  value={values.title}
                  onChange={(e) => setField('title', e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, title: true }))}
                  isInvalid={touched.title && !!errors.title}
                  placeholder="e.g., Atomic Habits"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="bookAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  value={values.author}
                  onChange={(e) => setField('author', e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, author: true }))}
                  isInvalid={touched.author && !!errors.author}
                  placeholder="e.g., James Clear"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.author}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="bookType">
                <Form.Label>Type / Genre</Form.Label>
                <Form.Select
                  value={values.type}
                  onChange={(e) => setField('type', e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, type: true }))}
                  isInvalid={touched.type && !!errors.type}
                >
                  {BOOK_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.type}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="bookPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="0.01"
                  value={values.price}
                  onChange={(e) => setField('price', e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, price: true }))}
                  isInvalid={touched.price && !!errors.price}
                  placeholder="e.g., 499.00"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="publishedDate">
                <Form.Label>Published Date (optional)</Form.Label>
                <Form.Control
                  type="date"
                  value={values.publishedDate}
                  onChange={(e) => setField('publishedDate', e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="imageUrl">
                <Form.Label>Image URL (optional)</Form.Label>
                <Form.Control
                  value={values.imageUrl}
                  onChange={(e) => setField('imageUrl', e.target.value)}
                  placeholder="https://..."
                />
                <Form.Text className="text-body-secondary">
                  This app stores the URL string only (no preview in the form).
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex flex-wrap gap-2 mt-4">
            <Button type="submit" variant="primary" disabled={!canSubmit}>
              {busy ? 'Saving…' : submitLabel}
            </Button>
            <Button
              type="button"
              variant="outline-secondary"
              onClick={onCancel}
              disabled={busy}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}

