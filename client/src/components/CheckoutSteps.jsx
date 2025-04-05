import { Row, Col } from 'react-bootstrap';
import { FaCheck, FaUser, FaTruck, FaCreditCard, FaBoxOpen } from 'react-icons/fa';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Row className="checkout-steps mb-5">
      <Col className={`step ${step1 ? 'active' : ''}`}>
        {step1 ? <FaCheck className="step-icon" /> : <FaUser className="step-icon" />}
        <span className="step-text">Sign In</span>
        <div className="step-connector" />
      </Col>
      <Col className={`step ${step2 ? 'active' : ''}`}>
        {step2 ? <FaCheck className="step-icon" /> : <FaTruck className="step-icon" />}
        <span className="step-text">Shipping</span>
        <div className="step-connector" />
      </Col>
      <Col className={`step ${step3 ? 'active' : ''}`}>
        {step3 ? <FaCheck className="step-icon" /> : <FaCreditCard className="step-icon" />}
        <span className="step-text">Payment</span>
        <div className="step-connector" />
      </Col>
      <Col className={`step ${step4 ? 'active' : ''}`}>
        {step4 ? <FaCheck className="step-icon" /> : <FaBoxOpen className="step-icon" />}
        <span className="step-text">Place Order</span>
      </Col>
    </Row>
  );
};

export default CheckoutSteps;
