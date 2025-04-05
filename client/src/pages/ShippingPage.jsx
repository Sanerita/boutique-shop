import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaShippingFast, FaBoxOpen, FaGlobeAmericas, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ShippingPage = () => {
  const shippingOptions = [
    {
      title: "Standard Shipping",
      price: "Free",
      time: "3-5 business days",
      icon: <FaShippingFast size={24} className="text-maroon" />,
      details: "Our standard shipping option with full tracking."
    },
    {
      title: "Express Shipping",
      price: "$19.99",
      time: "1-2 business days",
      icon: <FaBoxOpen size={24} className="text-maroon" />,
      details: "Priority handling for time-sensitive deliveries."
    },
    {
      title: "International",
      price: "Varies by destination",
      time: "5-10 business days",
      icon: <FaGlobeAmericas size={24} className="text-maroon" />,
      details: "Customs-friendly shipping to 100+ countries."
    }
  ];

  return (
    <Container className="py-5 my-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h1 className="display-5 fw-light mb-3">
              Shipping Policy
            </h1>
            <p className="lead text-muted">
              We deliver worldwide with care and precision
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {shippingOptions.map((option, index) => (
            <Col md={4} key={index}>
              <div className="h-100 p-4 border rounded-3 bg-white shadow-sm">
                <div className="d-flex align-items-center mb-3">
                  {option.icon}
                  <h3 className="h5 mb-0 ms-3">{option.title}</h3>
                </div>
                <div className="d-flex justify-content-between border-top pt-3">
                  <div>
                    <small className="text-muted">Cost</small>
                    <div className="h5">{option.price}</div>
                  </div>
                  <div className="text-end">
                    <small className="text-muted">Delivery Time</small>
                    <div className="h5">{option.time}</div>
                  </div>
                </div>
                <p className="mt-3 text-muted small">{option.details}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={10} className="mx-auto">
            <div className="bg-white p-4 p-lg-5 rounded-3 shadow-sm">
              <h2 className="h4 mb-4">
                <FaClock className="text-maroon me-2" />
                Delivery Information
              </h2>
              
              <Accordion flush>
                <Accordion.Item eventKey="0" className="border-0 mb-3">
                  <Accordion.Header className="bg-light rounded">
                    When will my order ship?
                  </Accordion.Header>
                  <Accordion.Body>
                    Orders placed before 2PM EST ship same day. Weekends and holidays may affect processing times.
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="1" className="border-0 mb-3">
                  <Accordion.Header className="bg-light rounded">
                    Do you offer international shipping?
                  </Accordion.Header>
                  <Accordion.Body>
                    Yes, we ship to over 100 countries. International orders may be subject to customs fees.
                  </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2" className="border-0">
                  <Accordion.Header className="bg-light rounded">
                    How can I track my order?
                  </Accordion.Header>
                  <Accordion.Body>
                    You'll receive a tracking number via email once your order ships. Track directly through our website or the carrier's portal.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default ShippingPage;