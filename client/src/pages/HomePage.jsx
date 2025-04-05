import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Product from "../components/Product";
import Loader from '../components/Loader';
import './Home.css';

const HomePage = () => {
  // Sample product data
  const featuredProducts = [
    {
      _id: 1,
      name: 'Silk Blend Blouse',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      price: 129.99,
      rating: 4.8,
      numReviews: 42,
      countInStock: 8,
      isNew: true
    },
    {
      _id: 2,
      name: 'Cashmere Turtleneck',
      image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      price: 249.99,
      rating: 4.9,
      numReviews: 36,
      countInStock: 5,
      discount: 15
    },
    {
      _id: 3,
      name: 'Italian Leather Tote',
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      price: 459.99,
      rating: 5.0,
      numReviews: 28,
      countInStock: 3
    },
    {
      _id: 4,
      name: 'Swiss Automatic Watch',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      price: 1299.99,
      rating: 4.9,
      numReviews: 51,
      countInStock: 2
    }
  ];

  const heroSlides = [
    {
      title: "Autumn Collection",
      subtitle: "Luxury redefined with sustainable materials",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      cta: "Discover Now"
    },
    {
      title: "Limited Edition",
      subtitle: "Exclusive pieces for the discerning client",
      image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      cta: "View Collection"
    }
  ];

  const isLoading = false;

  return (
    <>
      <main className="home-page">
        {/* Hero Carousel */}
        <section className="hero-carousel">
          <Carousel fade controls={false} indicators={false} interval={5000}>
            {heroSlides.map((slide, index) => (
              <Carousel.Item key={index}>
                <div 
                  className="hero-slide d-flex align-items-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                >
                  <Container>
                    <Row>
                      <Col lg={6} className="text-white">
                        <h1 className="display-3 fw-light mb-4">{slide.title}</h1>
                        <p className="lead mb-5">{slide.subtitle}</p>
                        <Link 
                          to="/shop" 
                          className="btn btn-outline-light btn-lg px-4 d-inline-flex align-items-center"
                        >
                          {slide.cta} <FiArrowRight className="ms-2" />
                        </Link>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        {/* Featured Collection */}
        <section className="py-6">
          <Container>
            <div className="text-center mb-6">
              <h2 className="display-5 fw-light mb-3">Curated Collections</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Each piece is thoughtfully selected for its craftsmanship, quality, and sustainability.
              </p>
            </div>
            
            <Row className="g-4 mb-6">
              <Col md={4}>
                <div className="collection-card">
                  <img 
                    src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Men's Collection" 
                    className="img-fluid"
                  />
                  <div className="collection-overlay">
                    <h3>Men's Tailoring</h3>
                    <Link to="/category/men" className="btn btn-sm btn-outline-light">
                      Explore <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="collection-card">
                  <img 
                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Women's Collection" 
                    className="img-fluid"
                  />
                  <div className="collection-overlay">
                    <h3>Women's Couture</h3>
                    <Link to="/category/women" className="btn btn-sm btn-outline-light">
                      Explore <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="collection-card">
                  <img 
                    src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" 
                    alt="Accessories" 
                    className="img-fluid"
                  />
                  <div className="collection-overlay">
                    <h3>Fine Accessories</h3>
                    <Link to="/category/accessories" className="btn btn-sm btn-outline-light">
                      Explore <FiArrowRight />
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Featured Products */}
        <section className="py-6 bg-light">
          <Container>
            <div className="text-center mb-6">
              <h2 className="display-5 fw-light mb-3">Featured Pieces</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                Our selection of exceptional items that define luxury with purpose.
              </p>
            </div>
            
            {isLoading ? (
              <Loader size={80} color="maroon" />
            ) : (
              <Row xs={1} md={2} lg={4} className="g-4">
                {featuredProducts.map((product) => (
                  <Col key={product._id}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        </section>

        {/* Editorial Section */}
        <section className="py-6 bg-white">
          <Container>
            <Row className="align-items-center">
              <Col lg={6} className="mb-5 mb-lg-0">
                <img 
                  src="https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Sustainable Luxury" 
                  className="img-fluid rounded shadow"
                />
              </Col>
              <Col lg={6}>
                <h2 className="display-5 fw-light mb-4">Sustainable Luxury</h2>
                <p className="lead text-muted mb-4">
                  We believe true luxury comes with responsibility. Each piece in our collection is crafted with 
                  sustainable materials and ethical production practices.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <Link to="/about" className="btn btn-maroon px-4">
                    Our Philosophy
                  </Link>
                  <Link to="/sustainability" className="btn btn-outline-dark px-4">
                    Sustainability Report
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Newsletter */}
        <section className="py-6 bg-dark text-white">
          <Container>
            <Row className="justify-content-center">
              <Col lg={8} className="text-center">
                <h2 className="display-5 fw-light mb-4">Join Our World</h2>
                <p className="lead text-muted mb-5">
                  Subscribe to receive exclusive previews, private sale invitations, and curated content.
                </p>
                <div className="d-flex flex-column flex-lg-row gap-3 justify-content-center">
                  <input 
                    type="email" 
                    className="form-control form-control-lg bg-transparent text-white border-light" 
                    placeholder="Your email address" 
                    style={{ maxWidth: '400px' }}
                  />
                  <button className="btn btn-outline-light btn-lg px-4">
                    Subscribe
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default HomePage;