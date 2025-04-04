import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { motion } from 'framer-motion';
import Meta from '../components/Meta';
import '../assets/styles/notFound.css';

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Meta title="Page Not Found" />
      <Container className="not-found-container text-center py-5">
        <h1 className="display-1 text-danger">404</h1>
        <h2 className="mb-4">Oops! Page Not Found</h2>
        <p className="lead mb-4">
          We can't seem to find the page you're looking for.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Return to Home
        </Button>
      </Container>
    </motion.div>
  );
};

export default NotFoundPage;