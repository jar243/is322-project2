import { LinkContainer } from "react-router-bootstrap"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"

const AppNav = () => (
  <div className="mb-3">
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand> IS322 - Project 2 - John Rezk </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-collapse" />

        <Navbar.Collapse id="navbar-collapse">
          <Nav className="ml-auto">
            <LinkContainer to="/task-board">
              <Nav.Link> Task Board </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/add-task">
              <Nav.Link> Add New Task </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
)

export default AppNav
