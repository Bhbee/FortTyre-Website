import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { IoLogoWhatsapp } from "react-icons/io";
import "./fixedWhatsapp.css";

const FixedWhatsapp: React.FC = () => {
  return (
    <div>
      <Container>
        <Row className="justify-content-end">
          <Col xs="1">
            <a
              href="https://wa.me/2348105636383"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IoLogoWhatsapp size="5rem" className="fixed-whatsapp" />
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FixedWhatsapp;
