import { Alert, Row, Col } from 'react-bootstrap'
import { EmployeeForm } from '../components/EmployeeForm.jsx'
import { EmployeeList } from '../components/EmployeeList.jsx'
import { useEmployeesContext } from '../context/EmployeesContext.jsx'

export function EmployeesPage() {
  const {
    employees,
    editingEmployee,
    addEmployee,
    startEdit,
    cancelEdit,
    updateEmployee,
    deleteEmployee,
    clearAllEmployees,
  } = useEmployeesContext()

  return (
    <>
      <h2 className="mb-3">Employees</h2>
      <Row className="g-3">
        <Col lg={5}>
          <EmployeeForm
            editingEmployee={editingEmployee}
            onAdd={(draft) => addEmployee(draft)}
            onUpdate={(id, draft) => updateEmployee(id, draft)}
            onCancelEdit={() => cancelEdit()}
          />
          <Alert variant="light" className="mb-0 border">
            <div className="fw-semibold">Event examples</div>
            <div className="text-muted small">
              - Add/Update: <code>onSubmit</code>
              <br />- Edit: <code>startEdit(eid)</code>
              <br />- Delete: <code>deleteEmployee(eid)</code>
              <br />- Clear all: <code>clearAllEmployees()</code>
            </div>
          </Alert>
        </Col>
        <Col lg={7}>
          <EmployeeList
            employees={employees}
            onEdit={(id) => startEdit(id)}
            onDelete={(id) => deleteEmployee(id)}
            onClearAll={() => clearAllEmployees()}
          />
        </Col>
      </Row>
    </>
  )
}

