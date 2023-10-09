import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
// import "./SuccessfullRegistration.css";

const SuccessfullRegistration: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row className="flex-column align-items-center">
        <Col
          xs={10}
          md={6}
          style={{
            backgroundColor: "#38b000",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <TiTick
            style={{
              color: "white",
              fontSize: "5rem",
              fontWeight: "light",
            }}
          />
          <h5 style={{ color: "white", fontWeight: "bold" }}>Success</h5>
        </Col>
        <Col
          xs={10}
          md={6}
          ClassName=""
          style={{
            padding: "2rem",
            textAlign: "center",
            border: "##D3D3D3",
          }}
        >
          <p style={{ fontWeight: "bold" }}>
            Congratulations, your account has been successfully created.
          </p>

          <NavLink to="../products">
            <Button
              style={{ borderRadius: "38px", backgroundColor: "#38b000" }}
            >
              Continue{" "}
              <HiOutlineArrowNarrowRight style={{ marginLeft: "0.5rem" }} />
            </Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default SuccessfullRegistration;
