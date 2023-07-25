import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import login from "../../../Assets/login.png";
// import { FaFacebookF } from "react-icons/fa";
import "./login.css";
import { Helmet } from "react-helmet-async";

const Login: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Row className="mt-5 mb-5">
        <Row>
          <Col xs={12}>
            <h3 className="login-header">Login</h3>
          </Col>
        </Row>

        <Container style={{ backgroundColor: "#F1FCF2" }}>
          {/* <Row className="mt-3"></Row> */}

          <Row className="mt-5">
            <Col className="login-form-col">
              <Image src={login} className="login-form-img" />
            </Col>

            <Col>
              <Row className="login-form-row-align">
                <Col xs={12} md={8} className="mt-5">
                  <Form.Text>
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Not registered yet?
                      <NavLink
                        to="../signup"
                        className="form-login-link-txt-decoration"
                      >
                        <span
                          style={{
                            textDecoration: "none",

                            marginLeft: "5px",
                          }}
                        >
                          Sign Up
                        </span>
                      </NavLink>
                    </p>
                  </Form.Text>
                </Col>
              </Row>

              <Row className="login-form-row-align">
                <Col xs={12} md={8} className="mt-3">
                  <p style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="login-google"
                    >
                      <span className="login-form-icon-btn">
                        <AiOutlineGoogle size="1.5rem" className="login-icon" />{" "}
                      </span>{" "}
                      <span className="login-form-txt-btn">
                        Continue with Google
                      </span>
                    </Button>
                  </p>
                </Col>
              </Row>

              <Row className="login-form-row-align">
                <Col xs={12} md={8} className="mt-3">
                  <Form.Text>
                    <p style={{ textAlign: "center", fontSize: "larger" }}>
                      Or
                    </p>
                  </Form.Text>
                </Col>
              </Row>

              <Form>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="johndoe@mail.com" />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="**********" />
                </Form.Group>

                <Row className="login-form-row-align">
                  <Col xs={12} md={8} className="mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      className="form-login-btn"
                    >
                      Login
                    </Button>
                  </Col>
                </Row>

                <Row className="login-form-row-align">
                  <Col xs={12} md={8} className="mt-3">
                    <Form.Text className="text-muted">
                      <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Forgot{" "}
                        <NavLink
                          to=""
                          className="form-login-link-txt-decoration"
                        >
                          Password?
                        </NavLink>
                      </p>
                    </Form.Text>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default Login;
