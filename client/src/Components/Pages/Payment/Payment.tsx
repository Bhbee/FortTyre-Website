import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import payment from "../../../Assets/payment.png";
import "./payment.css";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Button, Image } from "react-bootstrap";

const Payment: React.FC = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");

  //   const {data: payment, isLoading, error} = useGetPaymentQuery(orderId!, email, amount)

  const onSubmitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <Container className="payment-container">
      <h3>Payment</h3>
      <Row>
        <Col className="payment-img-col">
          <Image src={payment} alt="payment" fluid />
        </Col>
        <Col style={{ alignSelf: "center" }}>
          <Form>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                placeholder="johndoe@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="formBasicText">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
          <Button>Make Payment</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
