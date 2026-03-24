import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'

function NavItem({ to, children, end }) {
  return (
    <Nav.Link as={NavLink} to={to} end={end}>
      {children}
    </Nav.Link>
  )
}

export function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/" end>
            Book Store
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-nav" />
          <Navbar.Collapse id="main-nav">
            <Nav className="ms-auto">
              <NavItem to="/" end>
                Home
              </NavItem>
              <NavItem to="/books">View Books</NavItem>
              <NavItem to="/books/new">Add Book</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="py-4">
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  )
}

