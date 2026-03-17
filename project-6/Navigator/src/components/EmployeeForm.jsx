import { useEffect, useMemo, useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Stack } from 'react-bootstrap'
import { normalizeEmployeeDraft } from '../lib/employeeModel.js'
import { validateEmployeeDraft } from '../lib/validation.js'

const EMPTY = {
  fullName: '',
  email: '',
  phone: '',
  salary: '',
  status: 'Active',
}

export function EmployeeForm({ editingEmployee, onAdd, onUpdate, onCancelEdit }) {
  const isEditMode = Boolean(editingEmployee)
  const [draft, setDraft] = useState(EMPTY)
  const [touched, setTouched] = useState({})
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (editingEmployee) {
      setDraft(
        normalizeEmployeeDraft({
          fullName: editingEmployee.fullName,
          email: editingEmployee.email,
          phone: editingEmployee.phone,
          salary: editingEmployee.salary,
          status: editingEmployee.status,
        }),
      )
      setTouched({})
      setSubmitError('')
    } else {
      setDraft(EMPTY)
      setTouched({})
      setSubmitError('')
    }
  }, [editingEmployee])

  const errors = useMemo(() => validateEmployeeDraft(draft), [draft])
  const hasErrors = Object.keys(errors).length > 0
  const canSubmit = !hasErrors

  function setField(name, value) {
    setDraft((prev) => ({ ...prev, [name]: value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      salary: true,
      status: true,
    })
    setSubmitError('')

    const currentErrors = validateEmployeeDraft(draft)
    if (Object.keys(currentErrors).length > 0) {
      setSubmitError('Please fix the validation errors and try again.')
      return
    }

    if (isEditMode) onUpdate(editingEmployee.id, draft)
    else onAdd(draft)
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between gap-3 flex-wrap">
          <div>
            <Card.Title className="mb-1">{isEditMode ? 'Edit Employee' : 'Add Employee'}</Card.Title>
            <div className="text-muted">
              {isEditMode ? 'Update the selected employee record.' : 'Create a new employee record.'}
            </div>
          </div>
          <div className="text-muted small">
            Fields are controlled via <strong>onChange</strong>, submit via <strong>onSubmit</strong>.
          </div>
        </div>

        {submitError ? (
          <Alert variant="danger" className="mt-3 mb-0">
            {submitError}
          </Alert>
        ) : null}

        <Form className="mt-3" onSubmit={onSubmit}>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  value={draft.fullName}
                  onChange={(e) => setField('fullName', e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, fullName: true }))}
                  isInvalid={Boolean(touched.fullName && errors.fullName)}
                  placeholder="e.g., Ayesha Khan"
                />
                <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={draft.email}
                  onChange={(e) => setField('email', e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                  isInvalid={Boolean(touched.email && errors.email)}
                  placeholder="name@example.com"
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  value={draft.phone}
                  onChange={(e) => setField('phone', e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                  isInvalid={Boolean(touched.phone && errors.phone)}
                  placeholder="e.g., +923001234567"
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="salary">
                <Form.Label>Salary</Form.Label>
                <Form.Control
                  value={draft.salary}
                  onChange={(e) => setField('salary', e.target.value)}
                  onBlur={() => setTouched((p) => ({ ...p, salary: true }))}
                  isInvalid={Boolean(touched.salary && errors.salary)}
                  placeholder="e.g., 75000"
                />
                <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group controlId="status">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={draft.status}
                  onChange={(e) => setField('status', e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Stack direction="horizontal" gap={2} className="mt-3">
            <Button type="submit" variant={isEditMode ? 'warning' : 'primary'} disabled={!canSubmit}>
              {isEditMode ? 'Update Employee' : 'Add Employee'}
            </Button>
            {isEditMode ? (
              <Button type="button" variant="outline-secondary" onClick={onCancelEdit}>
                Cancel
              </Button>
            ) : null}
            {hasErrors ? (
              <div className="ms-auto text-muted small">Fix validation to enable submit.</div>
            ) : (
              <div className="ms-auto text-muted small">Ready.</div>
            )}
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  )
}

