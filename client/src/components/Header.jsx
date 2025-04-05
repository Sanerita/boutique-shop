import { Navbar, Container, Nav, Badge, Button, Form, FormControl, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from 'react-icons/fa';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth || {});
  const { cartItems = [] } = useSelector((state) => state.cart || {});

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <span className="text-maroon font-weight-bold">Boutique</span>
            <span className="text-success font-weight-light">Shop</span>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex mx-auto" style={{ width: '40%' }}>
            <FormControl
              type="search"
              placeholder="Search products..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-maroon">
              <FaSearch />
            </Button>
          </Form>

          <Nav className="ms-auto">
            <LinkContainer to="/wishlist">
              <Nav.Link className="position-relative">
                <FaHeart />
                <Badge pill bg="success" className="position-absolute top-0 start-100 translate-middle">
                  0
                </Badge>
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
              <Nav.Link className="d-flex align-items-center position-relative">
                <FaShoppingCart />
                <span className="ms-2">Cart</span>
                {cartItems.length > 0 && (
                  <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                  </Badge>
                )}
              </Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="d-flex align-items-center">
                  <FaUser className="me-1" />
                  {userInfo.name}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-end">
                  <LinkContainer to="/profile">
                    <Dropdown.Item>Profile</Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/order-history">
                    <Dropdown.Item>My Orders</Dropdown.Item>
                  </LinkContainer>
                  <Dropdown.Divider />
                  <LinkContainer to="/logout">
                    <Dropdown.Item>Logout</Dropdown.Item>
                  </LinkContainer>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="d-flex align-items-center">
                  <FaUser className="me-1" />
                  Sign In
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

