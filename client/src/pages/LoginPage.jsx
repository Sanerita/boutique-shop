import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = search ? search.split('=')[1] : '/';

  const { loading, error, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate(redirect);
      toast.success('Login successful');
    } catch (error) {
      toast.error(error?.data?.message || error.error || 'Login failed');
    }
  };

  return (
    <FormContainer>
      <Card className="shadow-sm border-0">
        <Card.Body className="p-4">
          <h1 className="text-center mb-4">Welcome Back</h1>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
          
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2"
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2"
              />
            </Form.Group>

            <Button 
              type="submit" 
              variant="maroon" 
              className="w-100 py-2 mb-3"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form>

          <Row className="text-center pt-3">
            <Col>
              <p className="text-muted">
                New Customer?{' '}
                <Link 
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                  className="text-maroon fw-bold"
                >
                  Register
                </Link>
              </p>
              <Link 
                to="/forgot-password" 
                className="text-muted small"
              >
                Forgot Password?
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainer>
  );
};

export default LoginPage;