import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";

const OrderConfirmation: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Checkout</title>
      </Helmet>
      <Row>
        <Col>
          <h3>This is the order confirmation page</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderConfirmation;
