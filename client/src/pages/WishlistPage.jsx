import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Badge, Container, ListGroup } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowLeft } from 'react-icons/fa';
import Message from '../components/Message';

const WishlistPage = () => {
  // Sample wishlist data - replace with your actual data fetching logic
  const wishlistItems = [
    {
      _id: '1',
      name: 'Premium Cotton T-Shirt',
      image: '/images/tshirt.jpg',
      price: 29.99,
      countInStock: 10,
      rating: 4.5
    },
    {
      _id: '2',
      name: 'Organic Linen Dress',
      image: '/images/dress.jpg',
      price: 59.99,
      countInStock: 5,
      rating: 4.8
    },
    {
      _id: '3',
      name: 'Handcrafted Leather Bag',
      image: '/images/bag.jpg',
      price: 89.99,
      countInStock: 0,
      rating: 4.7
    }
  ];

  return (
    <Container className="py-4">
      <div className="d-flex align-items-center mb-4">
        <Link to="/" className="btn btn-outline-maroon me-3">
          <FaArrowLeft />
        </Link>
        <h1 className="mb-0">Your Wishlist</h1>
        <Badge bg="maroon" className="ms-2 fs-6">
          {wishlistItems.length} items
        </Badge>
      </div>

      {wishlistItems.length === 0 ? (
        <Message variant="info">
          <div className="text-center py-5">
            <FaHeart size={48} className="text-muted mb-3" />
            <h4 className="mb-3">Your wishlist is empty</h4>
            <p className="text-muted mb-4">Save your favorite items here for later</p>
            <Link to="/" className="btn btn-maroon px-4">
              Start Shopping
            </Link>
          </div>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" className="shadow-sm rounded">
              {wishlistItems.map((item) => (
                <ListGroup.Item key={item._id} className="py-3">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <div className="position-relative">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ height: '80px', objectFit: 'cover' }}
                        />
                        {item.countInStock === 0 && (
                          <Badge bg="danger" className="position-absolute top-0 start-0 m-1">
                            Sold Out
                          </Badge>
                        )}
                      </div>
                    </Col>
                    <Col md={4}>
                      <Link 
                        to={`/product/${item._id}`} 
                        className="text-decoration-none text-dark fw-bold"
                      >
                        {item.name}
                      </Link>
                      <div className="mt-1">
                        <span className="text-maroon fw-bold">${item.price}</span>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="d-flex align-items-center">
                        <FaHeart className="text-danger me-2" />
                        <span className="text-muted small">In your wishlist</span>
                      </div>
                    </Col>
                    <Col md={3} className="text-end">
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="me-2"
                          title="Remove"
                        >
                          <FaTrash />
                        </Button>
                        <Button
                          variant="maroon"
                          size="sm"
                          disabled={item.countInStock === 0}
                          title="Add to cart"
                        >
                          <FaShoppingCart />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          
          <Col md={4}>
            <Card className="shadow">
              <Card.Body>
                <h5 className="mb-3">Wishlist Summary</h5>
                <div className="d-flex justify-content-between mb-2">
                  <span>Items:</span>
                  <span>{wishlistItems.length}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Total Value:</span>
                  <span className="text-maroon fw-bold">
                    ${wishlistItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                  </span>
                </div>
                <Button
                  variant="maroon"
                  className="w-100 mb-2"
                  disabled={wishlistItems.length === 0}
                >
                  Add All to Cart
                </Button>
                <Button
                  variant="outline-maroon"
                  className="w-100"
                  disabled={wishlistItems.length === 0}
                >
                  Clear Wishlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WishlistPage;