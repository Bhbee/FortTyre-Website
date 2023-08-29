import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import { toast, ToastContainer } from "react-toastify";
import { useForgotPasswordMutation } from "../../../Hooks/forgotPasswordHook";
import { useNavigate } from "react-router-dom";
import "./forgotpassword.css";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");

  const { mutateAsync: forgotPassword, isLoading } =
    useForgotPasswordMutation();

  const navigate = useNavigate();
  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await forgotPassword({
        email,
      });
      console.log(data);
      if (data.message === "Email sent successfully!") {
        toast.success("reset password has ben sent to your email", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        // navigate("../resetpassword");
        console.log("password successfully sent");
      }
    } catch (err) {
      console.log(err);
      toast.error(getError(err as ApiError), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <Container className="mt-5 top-container">
      <Row>
        <Col xs={12}>
          <h3 className="forgotpassword-header">Forgot Password</h3>
        </Col>
      </Row>

      <Helmet>
        <title>Forgot Password</title>
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label className="mb-3">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="johndoe@gmail.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Row className="forgotpassword-form-row-align">
              <Col xs={12} md={8} className="mt-3">
                <Form.Text className="text-muted">
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    <Button
                      onClick={submitHandler}
                      disabled={isLoading}
                      className="forgot-password-btn"
                    >
                      Send Password Reset Link
                    </Button>
                  </p>
                </Form.Text>
                <ToastContainer />
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
