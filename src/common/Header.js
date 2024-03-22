import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../asset/image/logo192.png';
import { handleLogoutRedux } from '../redux/action/userAction';

const Header = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.account);

  const handleLogout = () => {
    dispatch(handleLogoutRedux());
  };

  useEffect(() => {
    if (user && user.auth === false) {
      navigate('/login');
    }
  }, [user]);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">
            <img src={logo} width="30" height="30" className="mx-3" />
            <span>React-Bootstrap</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {((user && user.auth) || location.pathname === '/') && (
              <>
                <Nav className="me-auto" activeKey={location.pathname}>
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Manange Users
                  </NavLink>
                </Nav>

                <Nav>
                  {user && user.auth && <span className="nav-link">Welcome {user.email}</span>}

                  <NavDropdown title="Setting">
                    {user && user.auth ? (
                      <>
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                      </>
                    ) : (
                      <NavLink to="/login" className="dropdown-item">
                        Login
                      </NavLink>
                    )}
                  </NavDropdown>
                </Nav>
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
