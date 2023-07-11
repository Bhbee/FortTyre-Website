import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import "./hero.css";

const Hero: React.FC = () => {
  return (
    <header>
      <Container className="hero-container-img ">
        <div className="hero-image-overlay"></div>
        <Row className="hero-row">
          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8}>
              <h1
                style={{ textAlign: "center" }}
                className="header-gradient-color"
              >
                {" "}
                Make it a safe trip with Fort tyres.
              </h1>
            </Col>
          </Row>

          <Row className="justify-content-center mb-3">
            <Col xs={12} md={8}>
              <p style={{ textAlign: "center" }} className="hero-text">
                {" "}
                We help individuals and businesses experience a stress free tyre
                care process. We sell, fix and provide maintenance services for
                all tyre brands and sizes at the convenience of your home and
                offices.
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center mb-5">
            <Col xs={10} md={8} lg={4}>
              <p style={{ textAlign: "center" }}>
                <Button variant="success" size="lg" className="hero-shop-btn">
                  Shop Now{" "}
                  <HiOutlineArrowNarrowRight className="hero-btn-arrow" />
                </Button>
              </p>
            </Col>
          </Row>
        </Row>
      </Container>
    </header>
  );
};

export default Hero;
