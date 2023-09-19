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
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isPasswordValid = (password: string) => {
    const passwordPattern = /^(?=.*[@$!%*?&]).{8,}$/;

    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }

    if (!passwordPattern.test(password)) {
      return "Password must include one special character ($, #, &, ?, $ etc)";
    }

    return ""; // Return null if the password is valid
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    const validationError = isPasswordValid(newPassword);
    setError(validationError);
    setPassword(newPassword);
  };

  const { dispatch } = useContext(Store);

  const { mutateAsync: signUp, isLoading } = useSignUpMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signUp({
        first_name,
        last_name,
        email,
        phone_number,
        password,
      });
      dispatch({ type: "USER_REGISTERED", payload: data });
      localStorage.setItem("userRegistered", JSON.stringify(data));
      console.log("signUp", data);
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });

    } catch (err) {
      toast.error(getError(err as ApiError), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Container className="signup-top-container">
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
                <Form.Group className="mb-4" controlId="formBasicEmailFirtName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="first_name"
                    required
                    placeholder="John"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmailLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="last_name"
                    required
                    placeholder="Doe"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    placeholder="johndoe@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPhone">
                  <Form.Label>Phone number</Form.Label>
                  <Form.Control
                    type="phone_number"
                    required
                    placeholder="08083164856"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    placeholder="password"
                    onChange={handlePasswordChange}
                  />
                </Form.Group>

                {error && (
                  <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
                )}

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
