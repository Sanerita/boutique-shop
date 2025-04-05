import { Container } from 'react-bootstrap'; // Add this import
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-3 bg-dark text-white">
      <Container> {/* Now properly imported */}
        <div className="text-center">
          <Link to="/" className="text-white mx-2">Home</Link>
          <Link to="/about" className="text-white mx-2">About</Link>
          <Link to="/contact" className="text-white mx-2">Contact</Link>
        </div>
        <div className="text-center mt-2">
          © {new Date().getFullYear()} Boutique Shop
        </div>
      </Container>
    </footer>
  );
};

export default Footer;