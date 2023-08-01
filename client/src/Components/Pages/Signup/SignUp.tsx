import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import sign_up from "../../../Assets/sign_up.png";
import "./signup.css";
import { useSignUpMutation } from "../../../Hooks/UserSignUpHook";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../../../Store";
import { useContext } from "react";
import LoadingBox from "../../LoadingBox/LoadingBox";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userRegistered } = state;

  const { mutateAsync: signUp, isLoading } = useSignUpMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signUp({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      dispatch({ type: "USER_REGISTERED", payload: data });
      localStorage.setItem("userAccessToken", JSON.stringify(data));
      console.log("signUp", data);
      navigate("/cart");
    } catch (err) {
      toast.error(getError(err as ApiError), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Row className="mt-5 mb-5">
        <Row>
          <Col xs={12}>
            <h3 className="login-header">Signup</h3>
          </Col>
        </Row>

        <Container fluid style={{ backgroundColor: "#F1FCF2" }}>
          {/* <Row className="mt-3"></Row> */}

          <Row className="mt-5">
            <Col className="login-form-column">
              <div>
                <Image src={sign_up} className="login-form-img" />
              </div>
            </Col>

            <Col>
              <Row className="login-form-row-align">
                <Col xs={12} md={8}>
                  <Form.Text>
                    <p
                      style={{
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Signed up already?
                      <NavLink
                        to="../login"
                        className="form-login-link-txt-decoration"
                      >
                        <span
                          style={{
                            textDecoration: "none",

                            marginLeft: "5px",
                          }}
                        >
                          Login
                        </span>
                      </NavLink>
                    </p>
                  </Form.Text>
                </Col>
              </Row>

              <Row className="login-form-row-align">
                <Col xs={12} md={8}>
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
                <Col xs={12} md={8}>
                  <Form.Text>
                    <p style={{ textAlign: "center", fontSize: "larger" }}>
                      Or
                    </p>
                  </Form.Text>
                </Col>
              </Row>

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="firstName"
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="lastName"
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="johndoe@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="phoneNumber"
                    placeholder="080633733915"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                {/* <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Pasword</Form.Label>
                  <Form.Control type="password" placeholder="password" />
                </Form.Group> */}

                <Row className="login-form-row-align">
                  <Col xs={12} md={8} className="mt-3">
                    <Button
                      variant="primary"
                      disabled={isLoading}
                      type="submit"
                      size="lg"
                      className="form-login-btn"
                    >
                      Create my account
                    </Button>
                    <div className="mt-3">{isLoading && <LoadingBox />}</div>
                    <div>
                      <ToastContainer />
                    </div>
                  </Col>
                </Row>

                <Row className="login-form-row-align">
                  <Col xs={12} md={8} className="mt-3"></Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default SignUp;
