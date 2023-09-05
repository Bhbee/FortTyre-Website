import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import login from "../../../Assets/login.png";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import { Store } from "../../../Store";
import { useLoginMutation } from "../../../Hooks/UserHook";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import LoadingBox from "../../LoadingBox/LoadingBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(Store);

  const { mutateAsync: logIn, isLoading } = useLoginMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await logIn({
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      localStorage.setItem("userAccessToken", JSON.stringify(data));
      console.log("login", data);
      navigate("/cart");
      toast.success("successfully logged in", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } catch (err) {
      toast.error(getError(err as ApiError), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Container className="login-top-container">
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
                      disabled={isLoading}
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

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="johndoe@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="**********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Row className="login-form-row-align">
                  <Col xs={12} md={8} className="mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      disabled={isLoading}
                      className="form-login-btn"
                    >
                      Login
                    </Button>
                    <div className="mt-3">{isLoading && <LoadingBox />}</div>
                    <div>
                      <ToastContainer />
                    </div>
                  </Col>
                </Row>

                <Row className="forgotpassword-form-row-align">
                  <Col xs={12} md={8} className="mt-3">
                    <Form.Text className="text-muted">
                      <p style={{ textAlign: "center", fontWeight: "bold" }}>
                        Forgot{" "}
                        <NavLink
                          to="../forgotpassword"
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
