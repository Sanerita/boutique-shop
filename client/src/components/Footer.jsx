import { Container, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaFacebook, FaInstagram, FaTwitter, FaPinterest,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock
} from 'react-icons/fa';
import { motion } from 'framer-motion';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const socialLinks = [
    { icon: <FaFacebook />, url: "#", name: "Facebook" },
    { icon: <FaInstagram />, url: "#", name: "Instagram" },
    { icon: <FaTwitter />, url: "#", name: "Twitter" },
    { icon: <FaPinterest />, url: "#", name: "Pinterest" }
  ];

  const quickLinks = [
    { path: "/", name: "Home" },
    { path: "/shop", name: "Shop" },
    { path: "/about", name: "About" },
    { path: "/contact", name: "Contact" },
    { path: "/blog", name: "Journal" }
  ];

  const serviceLinks = [
    { path: "/ReturnsPage", name: "Returns & Exchanges" },
    { path: "/shipping", name: "Shipping Policy" },
    { path: "/privacy", name: "Privacy Policy" },
    { path: "/terms", name: "Terms of Service" },
    { path: "/faq", name: "FAQ" }
  ];

  // Helper function to check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="g-4">
          {/* Brand Column */}
          <Col lg={4} md={6}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="footer-brand mb-4">
                <h4 className="text-maroon fw-bold mb-3">BOUTIQUE</h4>
                <p className="text-muted mb-4">
                  Curated luxury fashion with sustainable materials and ethical production practices.
                </p>
                <div className="social-icons d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="text-white rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: '40px',
                        height: '40px',
                        background: 'rgba(255,255,255,0.1)',
                        transition: 'all 0.3s'
                      }}
                      whileHover={{ 
                        background: 'var(--maroon)',
                        scale: 1.1
                      }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Quick Links Column */}
          <Col lg={2} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h5 className="text-uppercase text-maroon mb-4">Shop</h5>
              <ul className="list-unstyled footer-links">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`d-block py-2 text-decoration-none ${isActive(link.path) ? 'text-maroon fw-bold' : 'text-white-50 hover-maroon'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Customer Service Column */}
          <Col lg={2} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h5 className="text-uppercase text-maroon mb-4">Support</h5>
              <ul className="list-unstyled footer-links">
                {serviceLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`d-block py-2 text-decoration-none ${isActive(link.path) ? 'text-maroon fw-bold' : 'text-white-50 hover-maroon'}`}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Col>

          {/* Contact & Newsletter Column */}
          <Col lg={4} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h5 className="text-uppercase text-maroon mb-4">Contact</h5>
              <ul className="list-unstyled text-white-50 mb-4">
                <li className="d-flex align-items-start mb-3">
                  <FaMapMarkerAlt className="me-3 mt-1 text-maroon" />
                  <span>123 Fashion Ave, Suite 100<br />New York, NY 10001</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaPhone className="me-3 text-maroon" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="d-flex align-items-center mb-3">
                  <FaEnvelope className="me-3 text-maroon" />
                  <span>hello@boutique.com</span>
                </li>
                <li className="d-flex align-items-center">
                  <FaClock className="me-3 text-maroon" />
                  <span>Mon-Fri: 9AM - 6PM</span>
                </li>
              </ul>

            </motion.div>
          </Col>
        </Row>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <hr className="my-4 border-secondary" />
          <div className="text-center py-2 text-white-50">
            <small>
              &copy; {currentYear} Boutique Shop. All rights reserved. | 
              Designed with <span className="text-maroon">♥</span> by Elpeap Group
            </small>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;