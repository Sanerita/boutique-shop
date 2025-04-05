import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { FaQuestionCircle, FaShoppingBag, FaUser, FaCreditCard } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FAQPage = () => {
  const faqCategories = [
    {
      title: "General Questions",
      icon: <FaQuestionCircle className="text-maroon me-2" />,
      items: [
        {
          question: "Where is Boutique located?",
          answer: "Our headquarters are in New York City, but we ship worldwide from multiple distribution centers."
        },
        {
          question: "Do you have physical stores?",
          answer: "We currently operate as an online-only boutique, allowing us to offer better prices and selection."
        }
      ]
    },
    {
      title: "Orders & Shipping",
      icon: <FaShoppingBag className="text-maroon me-2" />,
      items: [
        {
          question: "How can I track my order?",
          answer: "You'll receive a tracking number via email once your order ships. You can also check under 'My Orders' in your account."
        },
        {
          question: "Do you offer expedited shipping?",
          answer: "Yes, we offer express shipping options at checkout. Delivery times vary by destination."
        }
      ]
    },
    {
      title: "Account & Payments",
      icon: <FaUser className="text-maroon me-2" />,
      items: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and Apple Pay. All transactions are securely processed."
        },
        {
          question: "How do I update my account information?",
          answer: "Log in to your account and navigate to 'Account Settings' to update your details."
        }
      ]
    },
    {
      title: "Returns & Exchanges",
      icon: <FaCreditCard className="text-maroon me-2" />,
      items: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of delivery. Items must be unused with original tags attached."
        },
        {
          question: "How long do refunds take?",
          answer: "Refunds are processed within 3-5 business days after we receive your return. Bank processing times may vary."
        }
      ]
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
              Frequently Asked Questions
            </h1>
            <p className="lead text-muted">
              Find answers to common questions about our products and services
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={10} className="mx-auto">
            <div className="bg-white p-4 p-lg-5 rounded-3 shadow-sm">
              {faqCategories.map((category, catIndex) => (
                <div key={catIndex} className="mb-5">
                  <h2 className="h4 mb-4 d-flex align-items-center">
                    {category.icon}
                    {category.title}
                  </h2>
                  
                  <Accordion flush>
                    {category.items.map((item, itemIndex) => (
                      <Accordion.Item 
                        key={itemIndex} 
                        eventKey={`${catIndex}-${itemIndex}`}
                        className="border-0 mb-3"
                      >
                        <Accordion.Header className="bg-light rounded">
                          {item.question}
                        </Accordion.Header>
                        <Accordion.Body className="pt-3">
                          {item.answer}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              ))}
              
              <div className="text-center mt-5">
                <h3 className="h5 mb-3">Still have questions?</h3>
                <p className="text-muted mb-4">
                  Our customer service team is available to assist you
                </p>
                <a href="/contact" className="btn btn-maroon px-4">
                  Contact Us
                </a>
              </div>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default FAQPage;