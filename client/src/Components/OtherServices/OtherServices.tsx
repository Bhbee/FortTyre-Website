import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import fitting from "../../Assets/fitting.png";
import servicing from "../../Assets/servicing.png";
import maintenance from "../../Assets/maintenance.png";
import "./otherservices.css";

const OtherServices: React.FC = () => {
  return (
    <section
      className="mb-5"
      style={{ backgroundColor: "#C8FFC8", paddingTop: "4rem" }}
    >
      <div className="custom-shape-divider-top-1689872432">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <Container className="os-containner mt-5">
        <h3 className="other-services-header mb-3">Other Services</h3>
        <Row className="">
          <Col sm={6} md={4} lg={4} className="mt-3 mb-3">
            <NavLink
              to="/fitting"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h5 className="os-container-header">Fitting</h5>
              <div className="fitting">
                <img src={fitting} alt="tyre" className="img-fluid" />
                <div className="fitting-overlay">
                  <div className="fitting-content">
                    <p>
                      learn more <HiOutlineArrowNarrowRight />
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          </Col>
          <Col sm={6} md={4} lg={4} className="mt-3 mb-3">
            <NavLink
              to="/maintenance"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h5 className="os-container-header">Maintenance</h5>
              <div className="fitting">
                <img src={maintenance} alt="tyre" className="img-fluid" />
                <div className="fitting-overlay">
                  <div className="fitting-content">
                    <p>
                      learn more <HiOutlineArrowNarrowRight />
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          </Col>
          <Col sm={6} md={4} lg={4} className="mt-3 mb-3">
            <NavLink
              to="/servicing"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h5 className="os-container-header">Servicing</h5>
              <div className="fitting">
                <img src={servicing} alt="tyre" className="img-fluid" />
                <div className="fitting-overlay">
                  <div className="fitting-content">
                    <p>
                      learn more <HiOutlineArrowNarrowRight />
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OtherServices;
