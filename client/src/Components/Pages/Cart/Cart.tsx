import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsCartX } from "react-icons/bs";
import "./cart.css";

const Cart: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <h3 className="cart-header">Cart</h3>

        <Col className="mt-3 mb-5">
          <div style={{ textAlign: "center" }}>
            <BsCartX size="5em" color="##323643" />
          </div>
        </Col>
        <Row>
          <Col className="mt-3 mb-5">
            <h4 className="cart-headerh4">Your cart is currently empty</h4>{" "}
          </Col>
        </Row>
        
      </Row>
    </Container>
  );
};

export default Cart;
