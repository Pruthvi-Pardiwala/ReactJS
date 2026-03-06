import { Badge, Button, ButtonGroup, Card, Collapse } from 'react-bootstrap';

export default function StudentCard({ student, onDelete, onToggleStatus, onToggleDetails }) {
  const isPresent = student.status === 'Present';

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex align-items-start justify-content-between gap-3">
          <div className="flex-grow-1">
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <Card.Title className="mb-0">{student.name}</Card.Title>
              <Badge
                pill
                bg="light"
                className={[
                  'student-status-pill',
                  isPresent ? 'is-present' : 'is-absent',
                ].join(' ')}
              >
                {student.status}
              </Badge>
            </div>
            <Collapse in={student.showDetails}>
              <div className="mt-2 text-muted small">
                <div>
                  <span className="fw-semibold">Student ID:</span> {student.id}
                </div>
              </div>
            </Collapse>
          </div>

          <ButtonGroup aria-label={`Actions for ${student.name}`}>
            <Button
              variant={isPresent ? 'outline-success' : 'outline-danger'}
              onClick={() => onToggleStatus(student.id)}
            >
              {isPresent ? 'Mark Absent' : 'Mark Present'}
            </Button>
            <Button variant="outline-secondary" onClick={() => onToggleDetails(student.id)}>
              {student.showDetails ? 'Hide' : 'Details'}
            </Button>
            <Button variant="outline-dark" onClick={() => onDelete(student.id)}>
              Delete
            </Button>
          </ButtonGroup>
        </div>
      </Card.Body>
    </Card>
  );
}
