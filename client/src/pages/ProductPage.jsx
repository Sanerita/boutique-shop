import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form, Badge, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingCart, FaHeart } from 'react-icons/fa';
import axios from 'axios';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="py-4">
      <Button 
        variant="outline-maroon" 
        className="mb-4"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Go Back
      </Button>

      <Row className="g-4">
        <Col md={6}>
          <div className="product-image-container bg-light p-4 rounded">
            <Image 
              src={product.image} 
              alt={product.name} 
              fluid 
              className="product-main-image"
            />
            {product.countInStock > 0 && (
              <Badge bg="success" className="position-absolute top-0 start-0 m-3">
                In Stock
              </Badge>
            )}
            {product.countInStock === 0 && (
              <Badge bg="danger" className="position-absolute top-0 start-0 m-3">
                Out of Stock
              </Badge>
            )}
          </div>
        </Col>

        <Col md={3}>
          <ListGroup variant="flush" className="shadow-sm">
            <ListGroup.Item className="py-3">
              <h2 className="fw-bold">{product.name}</h2>
              <div className="my-3">
                <Rating 
                  value={product.rating} 
                  text={`${product.numReviews} reviews`}
                  color="#f8d64e"
                />
              </div>
            </ListGroup.Item>
            
            <ListGroup.Item className="py-3">
              <h5 className="text-muted">Description</h5>
              <p className="mt-2">{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card className="shadow">
            <ListGroup variant="flush">
              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Price:</Col>
                  <Col className="text-end">
                    <span className="fs-4 text-maroon fw-bold">
                      ${product.price}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <Row>
                  <Col>Status:</Col>
                  <Col className="text-end">
                    {product.countInStock > 0 ? (
                      <span className="text-success fw-bold">In Stock</span>
                    ) : (
                      <span className="text-danger fw-bold">Out of Stock</span>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item className="py-3">
                  <Row className="align-items-center">
                    <Col>Quantity:</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        className="form-select-sm"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item className="py-3">
                <Button
                  className="w-100 btn-maroon"
                  type="button"
                  disabled={product.countInStock === 0}
                  onClick={addToCartHandler}
                >
                  <FaShoppingCart className="me-2" />
                  {product.countInStock > 0 ? 'Add To Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline-maroon"
                  className="w-100 mt-2"
                  disabled={product.countInStock === 0}
                >
                  <FaHeart className="me-2" />
                  Add to Wishlist
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductPage;