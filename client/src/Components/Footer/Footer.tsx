import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-container-fluid footer-bg-img mt-5">
      <Container fluid>
        <Container className="footer-container-padding">
          <Row>
            <Col xs={12} sm={6} md={4} className="footer-col-align mb-5">
              <Row className="mb-3">
                <h3 className="footer-text-header">Services</h3>
              </Row>
              <p className="footer-paragraph">Tyre Purchase</p>
              <p className="footer-paragraph">Tyre Fittings</p>
              <p className="footer-paragraph">Tyre Maintenance</p>
            </Col>
            <Col xs={12} sm={6} md={4} className="footer-col-align mb-5">
              <Row className="mb-3">
                <h3 className="footer-text-header">Tyre Types</h3>
              </Row>
              <p className="footer-paragraph">Car Tyres</p>
              <p className="footer-paragraph">Bus Tyres</p>
              <p className="footer-paragraph">Truck Tyres</p>
              <p className="footer-paragraph">Trycycle Tyres</p>
            </Col>
            <Col xs={12} sm={6} md={4} className="footer-col-align mb-5">
              <Row className="mb-3">
                <h3 className="footer-text-header">Features</h3>
              </Row>
              <p className="footer-paragraph">Home</p>
              <p className="footer-paragraph">Products</p>
              <p className="footer-paragraph">Carts</p>
              <p className="footer-paragraph">Account</p>
              <p className="footer-paragraph">Terms</p>
            </Col>
            <Col xs={12} sm={6} md={4} className="footer-col-align">
              <Row className="mb-3">
                <h3 className="footer-text-header">Social Links</h3>
              </Row>
              <a
                href="https://www.linkedin.com/company/forttyres/"
                className="footer-social-links"
              >
                <FaLinkedinIn size="1.5em" color="white" />
              </a>
              <a
                href="https://twitter.com/fort_tyres"
                className="footer-social-links"
              >
                <FaTwitter size="1.5em" color="white" />
              </a>

              <a
                href="https://instagram.com/forttyres_com?igshid=NTc4MTIwNjQ2YQ=="
                className="footer-social-links"
              >
                <FaInstagram size="1.5em" color="white" />
              </a>

              <a
                href="https://www.facebook.com/forttyres
"
                className="footer-social-links"
              >
                <BsFacebook size="1.5em" color="white" />
              </a>
            </Col>
          </Row>
        </Container>
      </Container>
    </footer>
  );
};

export default Footer;
