import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Hero_banner_6 from "../../Assets/Hero_banner_6.png";
import Hero_Banner_2 from "../../Assets/Hero_Banner_2.png";
import Hero_Banner_4 from "../../Assets/Hero_Banner_4.png";
import "./heroslider.css";

const HeroSlider: React.FC = () => {
  return (
    <header>
      <Container fluid className="mb-5">
        <Carousel className="heroslider-container">
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 heroslider_image"
              src={Hero_Banner_4}
              alt="First slide"
            />
            <Carousel.Caption className="carousel-caption">
              <h1
                style={{ textAlign: "center" }}
                className="header-gradient-color"
              >
                {" "}
                Make it a safe trip with Fort tyres.
              </h1>
              <p
                style={{ textAlign: "center", fontWeight: "bold" }}
                className="heroslidertext"
              >
                {" "}
                We help individuals and businesses experience a stress free tyre
                care process. We sell, fix and provide maintenance services for
                all tyre brands and sizes at the convenience of your home and
                offices.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={2000}>
            <img
              className="d-block w-100 heroslider_image"
              src={Hero_Banner_2}
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-caption">
              <h1
                style={{ textAlign: "center" }}
                className="header-gradient-color"
              >
                {" "}
                Make it a safe trip with Fort tyres.
              </h1>
              <p
                style={{ textAlign: "center", fontWeight: "bold" }}
                className="heroslidertext"
              >
                {" "}
                We help individuals and businesses experience a stress free tyre
                care process. We sell, fix and provide maintenance services for
                all tyre brands and sizes at the convenience of your home and
                offices.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={1000}>
            <img
              className="d-block w-100 heroslider_image"
              src={Hero_banner_6}
              alt="Third slide"
            />
            <Carousel.Caption className="carousel-caption">
              <h1
                style={{ textAlign: "center" }}
                className="header-gradient-color"
              >
                {" "}
                Make it a safe trip with Fort tyres.
              </h1>
              <p
                style={{ textAlign: "center", fontWeight: "bold" }}
                className="heroslidertext"
              >
                {" "}
                We help individuals and businesses experience a stress free tyre
                care process. We sell, fix and provide maintenance services for
                all tyre brands and sizes at the convenience of your home and
                offices.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </header>
  );
};

export default HeroSlider;
