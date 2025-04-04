import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Meta from '../components/Meta';

const NotFoundPage = () => {
  return (
    <>
      <Meta title="Page Not Found" />
      <Container className="text-center py-5">
        <h1 className="display-1">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="lead">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button as={Link} to="/" variant="primary" size="lg">
          Go Back Home
        </Button>
      </Container>
    </>
  );
};

export default NotFoundPage;