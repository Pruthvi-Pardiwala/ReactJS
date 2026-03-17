import { useEffect, useMemo, useState } from 'react'
import { Alert, Badge, Button, Form, Stack } from 'react-bootstrap'

const EMPTY = { title: '', category: '', notes: '' }

export default function RecordForm({ mode, initialValue, onSubmit, onCancelEdit }) {
  const [value, setValue] = useState(EMPTY)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && initialValue) {
      setValue({
        title: initialValue.title ?? '',
        category: initialValue.category ?? '',
        notes: initialValue.notes ?? '',
      })
      setTouched(false)
      return
    }
    setValue(EMPTY)
    setTouched(false)
  }, [mode, initialValue])

  const errors = useMemo(() => {
    const next = {}
    if (!value.title.trim()) next.title = 'Title is required.'
    if (!value.category.trim()) next.category = 'Category is required.'
    if (value.notes.length > 200) next.notes = 'Notes must be 200 characters or less.'
    return next
  }, [value])

  const canSubmit = Object.keys(errors).length === 0

  function handleChange(e) {
    const { name, value: next } = e.target
    setValue((prev) => ({ ...prev, [name]: next }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (!canSubmit) return
    onSubmit({
      title: value.title.trim(),
      category: value.category.trim(),
      notes: value.notes.trim(),
    })
    setValue(EMPTY)
    setTouched(false)
  }

  const isEdit = mode === 'edit'

  return (
    <>
      <Stack direction="horizontal" className="mb-3" gap={2}>
        <div className="fw-semibold">Record Form</div>
        <Badge bg={isEdit ? 'warning' : 'success'} text={isEdit ? 'dark' : 'light'}>
          {isEdit ? 'Edit Mode' : 'Add Mode'}
        </Badge>
      </Stack>

      {touched && !canSubmit && (
        <Alert variant="danger" className="py-2">
          Please fix the highlighted fields.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="recordTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={value.title}
            onChange={handleChange}
            placeholder="e.g., Lesson Notes"
            isInvalid={touched && Boolean(errors.title)}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="recordCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            name="category"
            value={value.category}
            onChange={handleChange}
            placeholder="e.g., React / State"
            isInvalid={touched && Boolean(errors.category)}
            autoComplete="off"
          />
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="recordNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={value.notes}
            onChange={handleChange}
            placeholder="Optional (max 200 chars)"
            isInvalid={touched && Boolean(errors.notes)}
          />
          <Form.Control.Feedback type="invalid">{errors.notes}</Form.Control.Feedback>
          <div className="text-muted small mt-1">{value.notes.length}/200</div>
        </Form.Group>

        <Stack direction="horizontal" gap={2}>
          <Button type="submit" variant={isEdit ? 'warning' : 'primary'}>
            {isEdit ? 'Update Record' : 'Add Record'}
          </Button>
          {isEdit && (
            <Button type="button" variant="outline-secondary" onClick={onCancelEdit}>
              Cancel Edit
            </Button>
          )}
        </Stack>
      </Form>
    </>
  )
}

