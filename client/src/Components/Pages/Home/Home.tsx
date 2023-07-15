import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Hero from "../../Hero/Hero";
import HeroSlider from "../../HeroSlider/HeroSlider";
import { NavLink } from "react-router-dom";
import "./home.css";
import tyreBrands from "../../../Assets/tyreBrands.png";
import freshArrival from "../../../Assets/freshArrival.jpg";
import latest_deal_img from "../../../Assets/latest_deal_img.png";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import ProductsListing from "../ProductListing/ProductsListing";

const Home: React.FC = () => {
  const style = {
    backgroundColor: "#C8FFC8",
    padding: "20px",
  };
  return (
    <main>
      <section>
        {/* <Hero /> */}
        <HeroSlider />
        <Container style={style} fluid className="mt-5">
          <h3 className="product-text mt-3">Product Categories</h3>
          <Container className="mt-5 mb-5">
            {/* <ProductsListing /> */}
            <Row>
              <Col sm={6} md={4} lg={4} className="mt-3 mb-3">
                <NavLink
                  to="../premiumproducts"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h5 className="product-categories-text mb-3">Premium Tyres</h5>
                  <div className="product-categories">
                    <img src={tyreBrands} alt="tyre" className="img-fluid" />
                    <div className="overlay">
                      <div className="content">
                        <p>
                          Shop now <HiOutlineArrowNarrowRight />
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </Col>

              <Col sm={6} md={4} lg={4} className="mt-3 mb-3">
                <NavLink
                  to="../premiumproducts"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h5 className="product-categories-text mb-3">
                    Mid-Range Tyres
                  </h5>
                  <div className="product-categories">
                    <img src={tyreBrands} alt="tyre" className="img-fluid" />
                    <div className="overlay">
                      <div className="content">
                        <p>
                          Shop now <HiOutlineArrowNarrowRight />
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </Col>

              <Col sm={6} md={4} lg={4} className="mt-3 mb-3">
                <NavLink
                  to="../premiumproducts"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <h5 className="product-categories-text mb-3">Budget Tyres</h5>
                  <div className="product-categories">
                    <img src={tyreBrands} alt="tyre" className="img-fluid" />
                    <div className="overlay">
                      <div className="content">
                        <p>
                          Shop now <HiOutlineArrowNarrowRight />
                        </p>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </Col>
            </Row>
          </Container>
        </Container>
        <div className="custom-shape-divider-bottom-1688987183">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section> 

      <section>
        <Container className="mt-3">
          <Row className="latest-deal-row">
            <h5 className="latest-deal-heading">Latest Deals</h5>
            <Col className="mt-3 mb-3 hidden" lg={3}>
              <img src={freshArrival} alt="" className="latest-deal" />
            </Col>
            <Col className="mt-3 mb-3" sm={6} md={3}>
              <img src={latest_deal_img} alt="" className="latest-deal-img" />
            </Col>
            <Col className="mt-3 mb-3" sm={6} md={6}>
              <div className="latest-deal-desctiption-container">
                <img src="" alt="" />
                <div>
                  <p>Brand: Michelin Tyres</p>
                  <h3>MICHELIN 215/55R17</h3>
                  <p className="latest-deal-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Earum ducimus dignissimos omnis, minus magni dolorum
                    consequatur voluptate assumenda nulla temporibus?
                  </p>
                  <p>&#8358;50,000</p>
                  <button></button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Home;
