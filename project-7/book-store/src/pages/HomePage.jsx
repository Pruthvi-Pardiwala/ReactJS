import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div>
      <div className="home-hero p-4 p-md-5 mb-4 rounded-4 border bg-white shadow-sm">
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
          <div>
            <h1 className="display-6 mb-2">Book Store CRUD</h1>
            <div className="text-body-secondary">
              Add, view, edit, delete books. Data is saved in your browser
              (localStorage).
            </div>
          </div>
          <div className="d-flex gap-2">
            <Button as={Link} to="/books/new" variant="primary">
              Add Book
            </Button>
            <Button as={Link} to="/books" variant="outline-primary">
              View Books
            </Button>
          </div>
        </div>
      </div>

      <Row className="g-3">
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <Card.Title className="h5">Add a new book</Card.Title>
              <Card.Text className="text-body-secondary">
                Use a clean form on a separate page. After submitting, you’ll be
                redirected to the table view.
              </Card.Text>
              <Button as={Link} to="/books/new" variant="primary">
                Go to Form
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="p-4">
              <Card.Title className="h5">View / Search / Filter</Card.Title>
              <Card.Text className="text-body-secondary">
                See all books in a table with searching, filtering, and sorting
                options.
              </Card.Text>
              <Button as={Link} to="/books" variant="outline-primary">
                Open Table
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

