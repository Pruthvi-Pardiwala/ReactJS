import { Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Outlet } from 'react-router-dom'
import { EmployeesProvider } from '../context/EmployeesContext.jsx'

function LinkItem({ to, children, end = false }) {
  return (
    <Nav.Link as={NavLink} to={to} end={end}>
      {children}
    </Nav.Link>
  )
}

export function AppLayout() {
  return (
    <EmployeesProvider>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={NavLink} to="/" end>
            Employee Management
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="app-navbar" />
          <Navbar.Collapse id="app-navbar">
            <Nav className="me-auto">
              <LinkItem to="/" end>
                Employees
              </LinkItem>
              <LinkItem to="/about">About</LinkItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="app-page">
        <Outlet />
      </Container>
    </EmployeesProvider>
  )
}

