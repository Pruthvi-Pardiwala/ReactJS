import { Card } from 'react-bootstrap'

export function AboutPage() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text>
          Employee Management System is a React offline CRUD project built to practice state
          management, controlled forms, event handlers, conditional rendering, list rendering, and
          localStorage persistence.
        </Card.Text>
        <Card.Text className="mb-0">
          Tech: React + Vite, React Router, React Bootstrap, localStorage.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

