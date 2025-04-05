import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEye, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded product-card">
      {product.isNew && (
        <Badge bg="success" className="position-absolute top-0 start-0 m-2">
          New
        </Badge>
      )}
      
      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image} 
          variant="top" 
          className="product-image"
        />
      </Link>

      <div className="quick-view">
        <Button 
          variant="outline-maroon" 
          size="sm"
          as={Link}
          to={`/product/${product._id}`}
        >
          <FaEye /> Quick View
        </Button>
      </div>

      <Card.Body className="text-center">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <Card.Title as="div" className="mb-2">
            <strong className="text-dark">{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="h4" className="mb-3 text-maroon">
          ${product.price}
        </Card.Text>

        <Button
          variant="maroon"
          className="w-100 d-flex align-items-center justify-content-center"
        >
          <FaShoppingCart className="me-2" />
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
