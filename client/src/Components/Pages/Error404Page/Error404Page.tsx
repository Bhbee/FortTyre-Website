import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import pagenotfound from "../../../Assets/pagenotfound.png";
import Image from "react-bootstrap/Image";
import { Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import "./error404page.css";

const Error404Page: React.FC = () => {
  return (
    <Container className="mt-5">
      <Helmet>
        <title>Page Not Found</title>
      </Helmet>
      <Row className="justify-content-center">
        <Col md={4}>
          <Image src={pagenotfound} fluid />
        </Col>
        <Row className="justify-content-center text-center mt-3">
          <Col>
            <h5>This Page appears not to exist</h5>
          </Col>
          <NavLink to="/">
            <Button className="btn-404 mt-3">
              {" "}
              <BiArrowBack /> Go Back Home
            </Button>
          </NavLink>
        </Row>
      </Row>
    </Container>
  );
};

export default Error404Page;
