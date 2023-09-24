import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeroSlider from "../../HeroSlider/HeroSlider";
import "./home.css";
import freshArrival from "../../../Assets/freshArrival.jpg";
import latest_deal_img from "../../../Assets/latest_deal_img.png";
import OtherServices from "../../OtherServices/OtherServices";
import { Helmet } from "react-helmet-async";
import Products from "../../Products/Products";

const Home: React.FC = () => {
  return (
    <main className="mb-5">
      <section>
        <Helmet>
          <title>Fort Tyres</title>
        </Helmet>
        <HeroSlider />
      </section>

      <section>
        <Products />
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
                  {/* <button></button> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <OtherServices />
      </section>
    </main>
  );
};

export default Home;
