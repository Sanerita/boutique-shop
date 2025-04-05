import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Container, Card, Button, Form, Badge, Pagination, Spinner } from 'react-bootstrap';
import { FaSearch, FaFilter, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Message from '../components/Message';
import Meta from '../components/Meta';
import Rating from '../components/Rating';

const ShopPage = () => {
  const navigate = useNavigate();
  const { keyword, pageNumber } = useParams();

  // State for filters
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);

  // RTK Query hook with all parameters
  const { 
    data: productsData, 
    isLoading, 
    isError, 
    error 
  } = useGetProductsQuery({ 
    keyword, 
    pageNumber,
    // Add these if your API supports them
    // minPrice: priceRange[0],
    // maxPrice: priceRange[1],
    // categories: selectedCategories.join(',')
  });

  // Destructure with fallbacks
  const { products = [], page = 1, pages = 1 } = productsData || {};

  // Filter and sort products client-side if needed
  const filteredProducts = [...products]
    .filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedCategories.length === 0 || 
       selectedCategories.includes(product.category))
    )
    .sort((a, b) => {
      switch(sortOption) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
        default: return 0; // featured - no sorting
      }
    });

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status" variant="maroon">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading products...</p>
      </Container>
    );
  }

  // Error state
  if (isError) {
    return (
      <Container className="py-5">
        <Message variant="danger">
          {error?.data?.message || error.message || 'Error loading products'}
        </Message>
        <Button 
          variant="maroon" 
          className="mt-3"
          onClick={() => navigate(0)} // Refresh page
        >
          Try Again
        </Button>
      </Container>
    );
  }

  // Main render
  return (
    <>
      <Meta title="Boutique Shop | Discover Our Collection" />
      <div className="shop-hero py-5 mb-4 bg-light-maroon">
        <Container>
          <h1 className="display-5 fw-bold text-center text-maroon mb-4">
            {keyword ? `Search: ${keyword}` : 'Our Collection'}
          </h1>
          
          {/* Search and filter UI remains the same */}
          {/* ... */}
        </Container>
      </div>

      <Container className="mb-5">
        <Row className="g-4">
          {filteredProducts.map((product) => (
            <Col key={product._id} xs={6} md={4} lg={3}>
              {/* Product card remains the same */}
              {/* ... */}
            </Col>
          ))}
        </Row>

        {pages > 1 && (
          <Pagination className="mt-5 justify-content-center">
            {[...Array(pages).keys()].map((x) => (
              <Pagination.Item
                key={x + 1}
                active={x + 1 === page}
                onClick={() => navigate(
                  keyword 
                    ? `/shop/search/${keyword}/page/${x + 1}`
                    : `/shop/page/${x + 1}`
                )}
              >
                {x + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </Container>
    </>
  );
};

export default ShopPage;