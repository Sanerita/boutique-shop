import { Container, Row, Col } from 'react-bootstrap';
import { FaGavel, FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const TermsPage = () => {
  const keySections = [
    {
      icon: <FaGavel size={24} className="text-maroon" />,
      title: "General Terms",
      content: "By accessing our website, you agree to be bound by these terms."
    },
    {
      icon: <FaCreditCard size={24} className="text-maroon" />,
      title: "Purchases",
      content: "All orders are subject to availability and confirmation of order price."
    },
    {
      icon: <FaExchangeAlt size={24} className="text-maroon" />,
      title: "Returns",
      content: "Refer to our Returns Policy for conditions and instructions."
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
              Terms of Service
            </h1>
            <p className="lead text-muted">
              Effective: {new Date().toLocaleDateString()}
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {keySections.map((section, index) => (
            <Col md={4} key={index}>
              <div className="h-100 p-4 text-center">
                <div className="mb-3">{section.icon}</div>
                <h3 className="h5 mb-3">{section.title}</h3>
                <p className="text-muted">{section.content}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={10} className="mx-auto">
            <div className="bg-white p-4 p-lg-5 rounded-3 shadow-sm">
              <h2 className="h4 mb-4">1. Introduction</h2>
              <p className="mb-4">
                These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, Boutique accessible at boutique.com.
              </p>
              
              <h2 className="h4 mt-5 mb-3">2. Intellectual Property Rights</h2>
              <p className="mb-4">
                Unless otherwise stated, we own the intellectual property rights for all material on Boutique. All intellectual property rights are reserved.
              </p>
              
              <h2 className="h4 mt-5 mb-3">3. Restrictions</h2>
              <p className="mb-4">
                You are specifically restricted from: publishing any website material in other media; selling, sublicensing or commercializing any material; using this website contrary to applicable laws.
              </p>
              
              <h2 className="h4 mt-5 mb-3">4. Governing Law</h2>
              <p className="mb-0">
                These Terms shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
              </p>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default TermsPage;