import { Badge, Button, ButtonGroup } from 'react-bootstrap'

export default function RecordRow({ record, isEditing, onEdit, onDelete }) {
  return (
    <tr>
      <td className="text-truncate">
        {record.title}{' '}
        {isEditing && (
          <Badge bg="warning" text="dark">
            editing
          </Badge>
        )}
      </td>
      <td className="text-truncate">{record.category}</td>
      <td className="text-truncate">{record.notes || <span className="text-muted">—</span>}</td>
      <td className="text-end">
        <ButtonGroup size="sm">
          <Button variant="outline-primary" onClick={() => onEdit(record.id)}>
            Edit
          </Button>
          <Button variant="outline-danger" onClick={() => onDelete(record.id)}>
            Delete
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  )
}

