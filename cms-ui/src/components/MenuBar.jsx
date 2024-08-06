import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link, NavLink} from "react-router-dom"

export const MenuBar = () => {

    const user = useSelector(state => state.user.value)


    return user && <Navbar expand="lg" bg="dark" data-bs-theme="dark"  >
    <Container>
        <Link className="navbar-brand" >MERN Project</Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="me-auto" >
                <Nav.Item>
                    <NavLink className="nav-link" to=" " >Link</NavLink>
                </Nav.Item>
            </Nav>

            <Nav className="mb-lg-0 mb-2" >
                <Nav.Item>
                    <NavDropdown title="Demo User" align="end" >
                        <Link className="dropdown-item" to=""> Logout  </Link>
                        <Link className="dropdown-item" to=""> Edit User  </Link>
                    </NavDropdown>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Container>

</Navbar>
}