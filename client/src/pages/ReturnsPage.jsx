import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { FaBoxOpen, FaExchangeAlt, FaShippingFast, FaQuestionCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ReturnsPage = () => {
  return (
    <>
      <Container className="py-5">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-5"
        >
          <h1 className="display-5 fw-bold text-maroon mb-3">
            <FaBoxOpen className="me-3" />
            Returns & Exchanges
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
            We want you to love your purchase. If you don't, our hassle-free return process makes it easy.
          </p>
        </motion.div>

        {/* Main Content */}
        <Row className="g-4">
          {/* Return Process */}
          <Col lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h2 className="text-maroon mb-4">
                    <FaExchangeAlt className="me-2" />
                    How to Return an Item
                  </h2>
                  <ol className="steps ps-3">
                    <li className="mb-3">
                      <strong>Initiate your return</strong> within 30 days of delivery through our 
                      <Link to="/account/orders" className="text-maroon ms-1">Order History</Link>
                    </li>
                    <li className="mb-3">
                      <strong>Pack your item</strong> securely in the original packaging with all tags attached
                    </li>
                    <li className="mb-3">
                      <strong>Attach the return label</strong> included in your package
                    </li>
                    <li>
                      <strong>Drop off</strong> at any authorized carrier location
                    </li>
                  </ol>
                  <div className="alert bg-light-maroon mt-4 p-3">
                    <FaShippingFast className="text-maroon me-2" />
                    <strong>Free returns</strong> are available for all orders within the continental U.S.
                  </div>
                </Card.Body>
              </Card>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <h2 className="text-maroon mb-4">
                    <FaQuestionCircle className="me-2" />
                    Frequently Asked Questions
                  </h2>
                  <Accordion flush>
                    <Accordion.Item eventKey="0" className="mb-3 border-0">
                      <Accordion.Header className="bg-light rounded">
                        How long do returns take to process?
                      </Accordion.Header>
                      <Accordion.Body className="pt-3">
                        Once we receive your return, processing typically takes 3-5 business days. 
                        Refunds will appear on your original payment method within 5-10 business days.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="mb-3 border-0">
                      <Accordion.Header className="bg-light rounded">
                        Can I exchange an item instead of returning it?
                      </Accordion.Header>
                      <Accordion.Body className="pt-3">
                        Absolutely! Select "Exchange" when initiating your return and choose your preferred 
                        replacement item. Exchanges ship immediately upon receipt of your return.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="border-0">
                      <Accordion.Header className="bg-light rounded">
                        What if my item is damaged or defective?
                      </Accordion.Header>
                      <Accordion.Body className="pt-3">
                        Contact our <Link to="/contact" className="text-maroon">Customer Care</Link> team 
                        within 7 days of delivery for expedited resolution. We'll cover all return shipping costs 
                        and send a replacement immediately.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Sidebar */}
          <Col lg={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sticky-top"
              style={{ top: '20px' }}
            >
              <Card className="border-0 shadow-sm mb-4">
                <Card.Body className="p-4">
                  <h3 className="text-maroon mb-3">Return Summary</h3>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>Return Window:</span>
                      <strong>30 Days</strong>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>Return Cost:</span>
                      <strong>Free (U.S.)</strong>
                    </li>
                    <li className="d-flex justify-content-between py-2 border-bottom">
                      <span>Refund Method:</span>
                      <strong>Original Payment</strong>
                    </li>
                    <li className="d-flex justify-content-between py-2">
                      <span>Processing Time:</span>
                      <strong>3-5 Days</strong>
                    </li>
                  </ul>
                  <Button 
                    variant="maroon" 
                    size="lg" 
                    className="w-100 py-3"
                    as={Link}
                    to="/account/orders"
                  >
                    Start Your Return
                  </Button>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm bg-light-maroon">
                <Card.Body className="p-4">
                  <h4 className="text-maroon mb-3">Need Help?</h4>
                  <p className="mb-4">
                    Our customer care team is available to assist with any questions about your return.
                  </p>
                  <Button 
                    variant="outline-maroon" 
                    className="w-100"
                    as={Link}
                    to="/contact"
                  >
                    Contact Support
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ReturnsPage;