import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Hero from "../../Hero/Hero";
import Button from "react-bootstrap/Button";
import "./home.css";
// import ProductsListing from "../ProductListing/ProductsListing";

const Home: React.FC = () => {
  const style = {
    backgroundColor: "#F1FCF2",
    padding: "20px",
  };
  return (
    <section>
      <Hero />
      {/* <ProductsListing /> */}
      <Container style={style} fluid className="mt-5">
        <Container className="mt-5 mb-5">
          <Row className="mb-3">
            <Col xs={12} style={{ textAlign: "center" }}>
              <h2 className="heading-font">
                Tyre Purchase, Fitting and Maintenance.
              </h2>
            </Col>
          </Row>
          <Row className="mb-5 justify-content-center">
            <Col
              xs={12}
              lg={4}
              className="mb-3"
              style={{ textAlign: "center" }}
            >
              <Image
                src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                className="image"
                rounded
              />
            </Col>
            <Col
              xs={12}
              lg={4}
              className="mb-3"
              style={{ textAlign: "center" }}
            >
              <Image
                src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                className="image"
                rounded
              />
            </Col>
            <Col
              xs={12}
              lg={4}
              className="mb-3"
              style={{ textAlign: "center" }}
            >
              <Image
                src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                className="image"
                rounded
              />
            </Col>
          </Row>

          <Row className="mb-3 justify-content-center">
            <Col
              xs={12}
              lg={4}
              className="mb-3"
              style={{ textAlign: "center" }}
            >
              <Image
                src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                className="image"
                rounded
              />
            </Col>
            <Col
              xs={12}
              lg={4}
              className="mb-3"
              style={{ textAlign: "center" }}
            >
              <Image
                src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                className="image"
                rounded
              />
            </Col>
            <Col
              xs={12}
              lg={4}
              className="mb-3"
              style={{ textAlign: "center" }}
            >
              <Image
                src="https://media.istockphoto.com/id/1407217358/photo/panorama-image-of-a-new-tire-is-placed-on-the-tire-storage-rack-in-the-tire-industry-be.webp?b=1&s=170667a&w=0&k=20&c=JKwn7ckKUBX4EO5TmRearEf3lAh_PYbCjgV4FiM3B4g="
                className="image"
                rounded
              />
            </Col>

            <Row className="mt-5">
              <p className="home-paragraphs">
                We have all tyre brands and sizes available for delivery at your
                preferred location.
              </p>
              <Col xs={12} md={3} className="home-container-col">
                <Button variant="success" size="lg" className="home-shop-btn">
                  Go to Shop
                </Button>
              </Col>
            </Row>

            <Row className="mt-5">
              <h2 className="home-headings">Tyre Fittings</h2>
              <Col>
                <p className="home-paragraphs">
                  We fix your tyres using the best industry standard process.
                  Our team of trained professionals knows how to do this best.
                </p>
              </Col>
            </Row>

            <Row className="mt-5">
              <h2 className="home-headings">Maintenance & Advisory Support.</h2>
              <Col>
                <p className="home-paragraphs">
                  With our team of trained professionals, we provide advisory
                  and maintenance services for your tyres at the best cost.
                </p>
                <Col xs={12} md={3} className="home-container-col">
                  <Button variant="success" size="lg" className="home-shop-btn">
                    Send Request
                  </Button>
                </Col>
              </Col>
            </Row>
          </Row>
        </Container>
      </Container>
    </section>
  );
};

export default Home;
