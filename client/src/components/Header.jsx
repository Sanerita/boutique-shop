import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { cartItems = [] } = useSelector((state) => state.cart || {});

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* Single child for LinkContainer */}
        <LinkContainer to="/">
          <Navbar.Brand>Boutique Shop</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Cart link with single child */}
            <LinkContainer to="/cart">
              <Nav.Link className="d-flex align-items-center">
                <FaShoppingCart />
                <span className="ms-2">Cart</span>
                {cartItems.length > 0 && (
                  <Badge pill bg="danger" className="ms-1">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {/* User dropdown */}
            {userInfo ? (
              <Dropdown>
                <Dropdown.Toggle as={Nav.Link}>
                  <FaUser /> {userInfo.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <LinkContainer to="/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/logout">
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </LinkContainer>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;