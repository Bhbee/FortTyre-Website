import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet } from "react-router-dom";

const Account: React.FC = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>{/* <p>This is the account page</p> */}</Col>
        </Row>
        <Outlet />
      </Container>
    </div>
  );
};

export default Account;
