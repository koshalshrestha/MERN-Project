import { removeStorage } from "@/lib"
import { clearUser } from "@/store"
import { Container, Nav, Navbar, NavDropdown, Button, Dropdown } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom"

export const MenuBar = () => {

    const user = useSelector(state => state.user.value)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        removeStorage('cms_token')
        dispatch(clearUser())
        navigate('/login')
    }


    return user && <Navbar expand="lg" bg="dark" data-bs-theme="dark"  >
    <Container>
        <Link className="navbar-brand" to='/' >MERN Project</Link>
        <Navbar.Toggle />
        <Navbar.Collapse>
            <Nav className="me-auto" >
                {user.role == 'admin' && <Nav.Item>
                    <NavLink className="nav-link" to="/staffs" >
                        <i className="fa-solid fa-users me-2"></i> Staff</NavLink>
                </Nav.Item>}

                <Nav.Item>
                    <NavLink className="nav-link" to="/customers" >
                        <i className="fa-solid fa-user-group me-2"></i> Customers</NavLink>
                </Nav.Item>

                <Nav.Item>
                <NavLink className="nav-link" to="/categories" >
                        <i className="fa-solid fa-list me-2"></i> Categories</NavLink>
                </Nav.Item>

                <Nav.Item>
                    <NavLink className="nav-link" to="/brands" >
                        <i className="fa-solid fa-tags me-2"></i> Brands</NavLink>
                </Nav.Item>

                <Nav.Item>
                    <NavLink className="nav-link" to="/products" >
                        <i className="fa-solid fa-gifts me-2"></i> Products</NavLink>
                </Nav.Item>

                <Nav.Item>
                    <NavLink className="nav-link" to="/reviews" >
                        <i className="fa-solid fa-comments me-2"></i> Reviews</NavLink>
                </Nav.Item>

                <Nav.Item>
                    <NavLink className="nav-link" to="/orders" >
                        <i className="fa-solid fa-basket-shopping me-2"></i> Orders</NavLink>
                </Nav.Item>
            </Nav>

            <Nav className="mb-lg-0 mb-2" >
                <Nav.Item>
                    <NavDropdown title={<>
                            <i className="fa-solid fa-user me-2"></i> {user.name}
                        </>} align="end" >
                        <Link className="dropdown-item" to="/profile/edit"> 
                            <i className="fa-solid fa-user-edit"></i>  Edit Profile
                        </Link>
                        <Link className="dropdown-item" to="/profile/password">
                            <i className="fa-solid fa-key me-2"></i> Change Password 
                        </Link>
                        <Dropdown.Divider />
                        <Button variant="Link" className="dropdown-item" onClick= {handleLogout} >
                            <i className="fa-solid fa-right-from-bracket me-2" ></i> Logout
                        </Button>
                    </NavDropdown>
                </Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Container>

</Navbar>
}