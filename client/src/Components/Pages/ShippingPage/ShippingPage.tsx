import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../../../Store";
import { ToastContainer } from "react-toastify";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import CheckoutSteps from "../../CheckoutSteps/CheckoutSteps";
import shippingimage from "../../../Assets/shippingimage.png";
import "./shippingpage.css";

const ShippingPage: React.FC = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const {
    userAccessToken,
    cart: { deliveryAddress },
  } = state;

  const [fullname, setFullName] = useState(deliveryAddress.fullname || "");
  const [address, setAddress] = useState(deliveryAddress.address || "");
  const [city, setCity] = useState(deliveryAddress.city || "");
  const [country, setCountry] = useState(deliveryAddress.country || "");

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch({
      type: "SAVE_DELIVERY_ADDRESS",
      payload: {
        fullname,
        address,
        city,
        country,
      },
    });
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({
        fullname,
        address,
        city,
        country,
      })
    );

    navigate("/placeorder");
  };

  return (
    <Container className="shipping-page-container mt-5">
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      {/* <CheckoutSteps>step1 step2</CheckoutSteps> */}
      <h3
        style={{
          textAlign: "center",
          color: "green",
          fontWeight: "bold",
          marginTop: "1rem",
        }}
      >
        Shipping Address
      </h3>
      <Container fluid>
        {" "}
        <Container>
          <Row>
            <Col className="shipping-image-col">
              <Image src={shippingimage} fluid />
            </Col>
            <Col>
              <Form className="mt-5" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    type="fullname"
                    placeholder="full Name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    type="address"
                    placeholder="address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    type="city"
                    placeholder="city"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    type="country"
                    placeholder="country"
                    required
                  />
                </Form.Group>

                <Row className="login-form-row-align">
                  <Col xs={12} md={4} className="mt-3">
                    <Button
                      variant="primary"
                      type="submit"
                      size="lg"
                      id="shipping-continue-btn"
                    >
                      <span className="shipping-continue-txt">Continue</span>
                      <HiOutlineArrowNarrowRight />
                    </Button>
                    {/* <div className="mt-3">  {isLoading && <LoadingBox />}  </div> */}
                    <div>
                      <ToastContainer />
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default ShippingPage;
