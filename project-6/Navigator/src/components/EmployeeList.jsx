import { useMemo, useState } from 'react'
import { Alert, Button, Card, Modal, Stack, Table } from 'react-bootstrap'
import { EmployeeRow } from './EmployeeRow.jsx'

export function EmployeeList({ employees, onEdit, onDelete, onClearAll }) {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [confirmClear, setConfirmClear] = useState(false)

  const deletingEmployee = useMemo(
    () => employees.find((e) => e.id === confirmDeleteId) ?? null,
    [employees, confirmDeleteId],
  )

  return (
    <Card>
      <Card.Body>
        <Stack direction="horizontal" className="justify-content-between flex-wrap gap-2">
          <div>
            <Card.Title className="mb-1">Employee List</Card.Title>
            <div className="text-muted">List rendering + argument passing in event handlers.</div>
          </div>
          <Button
            variant="outline-danger"
            onClick={() => setConfirmClear(true)}
            disabled={employees.length === 0}
          >
            Clear All
          </Button>
        </Stack>

        {employees.length === 0 ? (
          <Alert variant="secondary" className="mt-3 mb-0">
            No Employees Found.
          </Alert>
        ) : (
          <div className="mt-3">
            <Table responsive hover bordered className="mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{ width: 120 }}>Salary</th>
                  <th style={{ width: 110 }}>Status</th>
                  <th style={{ width: 170 }} className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <EmployeeRow
                    key={emp.id}
                    employee={emp}
                    onEdit={(id) => onEdit(id)}
                    onDelete={(id) => setConfirmDeleteId(id)}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card.Body>

      <Modal show={Boolean(confirmDeleteId)} onHide={() => setConfirmDeleteId(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deletingEmployee ? (
            <>
              Delete <strong>{deletingEmployee.fullName}</strong>? This cannot be undone.
            </>
          ) : (
            'Delete this employee?'
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (confirmDeleteId) onDelete(confirmDeleteId)
              setConfirmDeleteId(null)
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={confirmClear} onHide={() => setConfirmClear(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear all employees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will remove <strong>all</strong> employee records (and clear localStorage).
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmClear(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onClearAll()
              setConfirmClear(false)
            }}
          >
            Clear All
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}

