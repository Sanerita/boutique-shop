import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children, title, subtitle, xs = 12, md = 6 }) => {
  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col xs={xs} md={md}>
          {title && <h1 className="text-center mb-4">{title}</h1>}
          {subtitle && <p className="text-center text-muted mb-4">{subtitle}</p>}
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;