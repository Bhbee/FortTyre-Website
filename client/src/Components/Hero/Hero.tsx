import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./hero.css";

const Hero: React.FC = () => {
  return (
    <section>
      <Container className="hero-container-img">
        <div className="hero-image-overlay"></div>
        <Row className="hero-row">
          <Row className="justify-content-center mt-5 mb-3">
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
                  Shop Now
                </Button>
              </p>
            </Col>
          </Row>
        </Row>
      </Container>
      {/* <Container className="mt-5">
        <Row>
          <Col xs={12} lg={6} className="hero-col1-padding">
            <Row className="mb-2">
              <Col xs={12}>
                <h1 className="header-gradient-color">
                  Make it a safe trip with Fort tyres.
                </h1>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={12} md={10}>
                <p className="hero-typo-sizing">
                  We help individuals and businesses experience a stress free
                  tyre care process. We sell, fix and provide maintenance
                  services for all tyre brands and sizes at the convenience of
                  your home and offices.
                </p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col xs={12} md={8}>
                <Button variant="success" size="lg" className="hero-shop-btn">
                  Shop Now
                </Button>
              </Col>
            </Row>
          </Col>

          <Col xs={12} lg={6}>
            <Row>
              <Col xs={12}>
                <Image
                  src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                  className="hero-image"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container> */}
    </section>
  );
};

export default Hero;
