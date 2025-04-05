import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product-card">
      {product.countInStock === 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
          Sold Out
        </Badge>
      )}
      {product.isNew && (
        <Badge bg="success" className="position-absolute top-0 start-0 m-2">
          New
        </Badge>
      )}
      {product.discount > 0 && (
        <Badge bg="maroon" className="position-absolute top-0 start-50 translate-middle m-2">
          -{product.discount}%
        </Badge>
      )}

      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image} 
          variant="top" 
          className="product-image"
        />
      </Link>

      <Card.Body className="text-center">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title as="div" className="mb-2">
            <strong className="text-dark">{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <Rating 
            value={product.rating} 
            text={`${product.numReviews} reviews`} 
            color="#8b0000"
          />
        </Card.Text>

        <Card.Text as="h4" className="mb-3">
          {product.discount > 0 ? (
            <>
              <span className="text-maroon">${(product.price * (1 - product.discount/100)).toFixed(2)}</span>
              <small className="text-muted text-decoration-line-through ms-2">${product.price}</small>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </Card.Text>

        <Button
          variant={product.countInStock > 0 ? "maroon" : "secondary"}
          className="w-100"
          disabled={product.countInStock === 0}
        >
          {product.countInStock > 0 ? 'Add to Cart' : 'Notify Me'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Product;

