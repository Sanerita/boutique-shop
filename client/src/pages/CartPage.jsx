import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container,  // Added Container import
  Row, 
  Col, 
  ListGroup, 
  Image, 
  Form, 
  Button, 
  Card, 
  Badge 
} from 'react-bootstrap';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <div className="d-flex align-items-center mb-4">
            <Button 
              variant="outline-maroon" 
              className="me-3"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </Button>
            <h1 className="mb-0">Your Shopping Cart</h1>
            <Badge bg="maroon" className="ms-2">
              {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
            </Badge>
          </div>
          
          {cartItems.length === 0 ? (
            <Message variant="info">
              <div className="d-flex flex-column align-items-center py-4">
                <FaShoppingCart size={48} className="text-muted mb-3" />
                <p className="mb-3 fs-5">Your cart is empty</p>
                <Link to="/" className="btn btn-maroon px-4">
                  Continue Shopping
                </Link>
              </div>
            </Message>
          ) : (
            <ListGroup variant="flush" className="shadow-sm rounded">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className="py-3">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fluid 
                        rounded 
                        className="product-image"
                      />
                    </Col>
                    <Col md={3}>
                      <Link 
                        to={`/product/${item._id}`} 
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className="text-maroon fw-bold">
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart({
                              ...item,
                              qty: Number(e.target.value),
                            })
                          )
                        }
                        className="form-select-sm"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="outline-danger"
                        className="p-2"
                        onClick={() => removeFromCartHandler(item._id)}
                        aria-label="Remove item"
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        
        <Col md={4}>
          <Card className="shadow">
            <ListGroup variant="flush">
              <ListGroup.Item className="py-3 bg-light">
                <h2 className="mb-3 text-center">
                  Order Summary
                </h2>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">
                    ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="fw-bold">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-bold">Total:</span>
                  <span className="text-maroon fw-bold fs-5">
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </span>
                </div>
                <Button
                  type="button"
                  className="btn-maroon w-100 py-2"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
              <ListGroup.Item className="py-2 text-center">
                <small className="text-muted">
                  or <Link to="/" className="text-maroon">Continue Shopping</Link>
                </small>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;