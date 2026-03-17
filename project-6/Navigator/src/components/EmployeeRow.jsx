import { Badge, Button } from 'react-bootstrap'

export function EmployeeRow({ employee, onEdit, onDelete }) {
  return (
    <tr>
      <td className="fw-semibold">{employee.fullName}</td>
      <td className="text-muted">{employee.email}</td>
      <td className="text-muted">{employee.phone}</td>
      <td>{employee.salary}</td>
      <td>
        <Badge bg={employee.status === 'Inactive' ? 'secondary' : 'success'}>{employee.status}</Badge>
      </td>
      <td className="text-end">
        <div className="d-inline-flex gap-2">
          <Button size="sm" variant="outline-primary" onClick={() => onEdit(employee.id)}>
            Edit
          </Button>
          <Button size="sm" variant="outline-danger" onClick={() => onDelete(employee.id)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  )
}

