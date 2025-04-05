import { Container, Row, Col } from 'react-bootstrap';
import { FaShieldAlt, FaUserLock, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PrivacyPage = () => {
  const privacyPoints = [
    {
      icon: <FaShieldAlt size={24} className="text-maroon" />,
      title: "Data Protection",
      content: "We implement industry-standard encryption to safeguard your personal information."
    },
    {
      icon: <FaUserLock size={24} className="text-maroon" />,
      title: "Your Control",
      content: "Manage your preferences and data through your account settings at any time."
    },
    {
      icon: <FaDatabase size={24} className="text-maroon" />,
      title: "Transparency",
      content: "We clearly disclose how we collect, use, and share your information."
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
              Privacy Policy
            </h1>
            <p className="lead text-muted">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </Col>
        </Row>

        <Row className="g-4 mb-5">
          {privacyPoints.map((point, index) => (
            <Col md={4} key={index}>
              <div className="h-100 p-4 text-center">
                <div className="mb-3">{point.icon}</div>
                <h3 className="h5 mb-3">{point.title}</h3>
                <p className="text-muted">{point.content}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={10} className="mx-auto">
            <div className="bg-white p-4 p-lg-5 rounded-3 shadow-sm">
              <h2 className="h4 mb-4">Our Commitment</h2>
              <p className="mb-4">
                At Boutique, we respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you about how we look after your personal data when you 
                visit our website and tell you about your privacy rights.
              </p>
              
              <h3 className="h5 mt-5 mb-3">Information We Collect</h3>
              <ul className="text-muted">
                <li className="mb-2">Identity Data (name, username, title)</li>
                <li className="mb-2">Contact Data (billing/delivery address, email, phone)</li>
                <li className="mb-2">Technical Data (IP address, browser type, location)</li>
                <li className="mb-2">Usage Data (how you use our website/products)</li>
                <li>Marketing/Communication preferences</li>
              </ul>
              
              <h3 className="h5 mt-5 mb-3">Your Rights</h3>
              <p className="text-muted">
                You have the right to request access, correction, or deletion of your personal data. 
                Contact our Data Protection Officer at privacy@boutique.com with any inquiries.
              </p>
            </div>
          </Col>
        </Row>
      </motion.div>
    </Container>
  );
};

export default PrivacyPage;