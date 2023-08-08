import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import { useResetPasswordHookMutation } from "../../../Hooks/resetPasswordHook";
import "./resetpasword.css";

const ResetPassword: React.FC = () => {

const [password, setPassword] = useState("");

const { mutateAsync: resetPassword, isLoading } = useResetPasswordHookMutation();

const navigate = useNavigate();
const submitHandler = async (e: React.SyntheticEvent) => {
  e.preventDefault();
  try {
    const data = await resetPassword({
      password,
    });
    console.log(data);
    if (data.message === "Password reset successful") {
      navigate("../login");
      console.log("password successfully reset");
    }
  } catch (err) {
    console.log(err);
    toast.error(getError(err as ApiError), {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  }
};



  return (
    <Container className="mt-5 reset-password-top-container">
      <Row>
        <Col xs={12}>
          <h3 className="resetpassword-header">Reset Password</h3>
        </Col>
      </Row>

      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group className="mt-3" controlId="formBasicPassword">
              <Form.Label className="mb-3">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>

            <Row className="login-form-row-align">
              <Col xs={12} md={8} className="mt-3">
                <Form.Text className="text-muted">
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    <Button onSubmit={submitHandler} disabled={isLoading} className="forgot-password-btn mt-3">
                      Reset Password
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

export default ResetPassword;
