import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import "./footer.css";
import logofooter from "../../Assets/logofooter.png";

const Footer: React.FC = () => {
  function getCurrentYear() {
    const currentDate = new Date();
    return currentDate.getFullYear();
  }

  const year = getCurrentYear();

  return (
    <footer>
      <Container className="d-flex footer-container">
        <Row className="footer-row">
          <Col>
            <h5>
              Get updates and special offers from{" "}
              <span style={{ color: "#379237" }}>Fort Tyres</span>
            </h5>
          </Col>
          <Col>
            <Form className="d-flex">
              <Form.Control
                type="input"
                placeholder="Email address"
                className="me-2"
                aria-label="Search"
              />

              <Button variant="outline-success" className="footer-btn">
                <span className="subscribe"> Subscribe</span>
                <HiOutlineArrowNarrowRight />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="footer-second-container">
        <Row>
          {/* <Col md={3} className="heading">
            <h5 className="mb-3 footer-heading">Categroies</h5>
            <NavLink to="" className="footer-text-decoration">
              <p>Premium Tyres</p>
            </NavLink>
            <NavLink to="" className="footer-text-decoration">
              <p>Mid-Range Tyres</p>
            </NavLink>
            <NavLink to="" className="footer-text-decoration">
              <p>Budget Tyres</p>
            </NavLink>
          </Col> */}
          <Col md={3} className="heading">
            <h5 className="mb-3 footer-heading">Features</h5>
            <NavLink to="" className="footer-text-decoration">
              <p>Home</p>
            </NavLink>
            <NavLink to="" className="footer-text-decoration">
              <p>Login</p>
            </NavLink>
            <NavLink to="" className="footer-text-decoration">
              <p>Register</p>
            </NavLink>
          </Col>

          <Col className="heading">
            <h5 className="mb-3 footer-heading">Contact</h5>

            <p className="footer-contact-text">+234 808 316 4856</p>

            <p className="footer-contact-text">sales@fortyres.com</p>
            <p className="footer-contact-text">
              KM 20, Office 3B, A & B Mall Lekki Expressway, Opp. Lagos Business
              School.
            </p>
          </Col>

          <Col md={3} className="heading">
            <h5 className="mb-3 footer-heading">Social Links</h5>
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
              href="https://www.facebook.com/forttyres"
              className="footer-social-links"
            >
              <BsFacebook size="1.5em" color="white" />
            </a>
            <a
              href="https://instagram.com/forttyres_com?igshid=NTc4MTIwNjQ2YQ=="
              className="footer-social-links"
            >
              <FaInstagram size="1.5em" color="white" />
            </a>
          </Col>
        </Row>
      </Container>
      <Container className="mb-3">
        <div className="footer-border"></div>
      </Container>
      <Container className="mt-3 footer-container-padding-last footer-last-flex">
        <Col>
          <Image src={logofooter} className="image-fluid footer-logo" />
        </Col>

        <p className="mt-3 footer-copyright">
          &copy;{year} FortTyre.com All Right Reserved
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
