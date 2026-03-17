import { Alert, Table } from 'react-bootstrap'
import RecordRow from './RecordRow.jsx'

export default function RecordList({ records, editingId, onEdit, onDelete }) {
  if (records.length === 0) {
    return (
      <Alert variant="secondary" className="mb-0">
        No Records Found.
      </Alert>
    )
  }

  return (
    <>
      <div className="fw-semibold mb-2">Record List</div>
      <div className="table-responsive">
        <Table striped hover bordered className="mb-0 table-fixed align-middle">
          <thead>
            <tr>
              <th style={{ width: '22%' }}>Title</th>
              <th style={{ width: '18%' }}>Category</th>
              <th>Notes</th>
              <th style={{ width: '140px' }} className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <RecordRow
                key={record.id}
                record={record}
                isEditing={editingId === record.id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </Table>
      </div>
    </>
  )
}

