import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Error404Page: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h3>Error 404</h3>
        </Col>
        <p>This page does not exist</p>
      </Row>
    </Container>
  );
};

export default Error404Page;
