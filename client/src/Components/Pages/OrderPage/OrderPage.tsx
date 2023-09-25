import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { Store } from "../../../Store";
import { Helmet } from "react-helmet-async";
import "./orderpage.css";
import { useGetOrderDetailsQuery } from "../../../Hooks/orderHook";
import LoadingBox from "../../LoadingBox/LoadingBox";
import MessageBox from "../../MessageBox/MessageBox";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import { Button, Card, ListGroup } from "react-bootstrap";
import { usePostPaymentMutation } from "../../../Hooks/paymentHook";
import { toast } from "react-toastify";
import { PaymentType } from "../../../Types/PaymentType";

const OrderPage: React.FC = () => {
  const { state } = useContext(Store);
  //   const { userAccessToken, cart } = state;

  const params = useParams();
  const navigate = useNavigate();
  const { id: orderId } = params;
  console.log("orderId", orderId);

  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId!);
  console.log("order", order);

  const { mutateAsync: payment, isLoading: loadingPaymentResponse } =
    usePostPaymentMutation();

  const makePayment = async () => {
    try {
      payment({
        id: orderId,
        email: order?.userEmail,
        amount: order?.totalPrice,
      }).then((paymentURL: PaymentType) => {
        window.location.replace(`${paymentURL.data.authorization_url}`);
      });
    } catch (err) {
      toast.error(getError(err as ApiError), {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const getOrderById = async () => {
    if (orderId !== "") {
      console.log("orderId", orderId);
      await refetch();
      console.log("after-refetch", order);
    }
  };

  useEffect(() => {
    getOrderById();
  }, [orderId]);

  return (
    <Container className="order-page-container">
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : order ? (
        <div>
          <Helmet>
            <title>Order Page</title>
          </Helmet>
          <h3 className="order-page-heading mb-3">Order {order?._id}</h3>
          <Row>
            <Col md={8}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Shipping</Card.Title>
                  <Card.Text>
                    <strong>Name:</strong> {order!.deliveryAddress.fullname}{" "}
                    <br />
                    <strong>Address: </strong> {order.deliveryAddress.address},
                    {order.deliveryAddress.city},{" "}
                    {order.deliveryAddress.country}
                    &nbsp;
                    {order.isDelivered ? (
                      <MessageBox variant="success">Delivered</MessageBox>
                    ) : (
                      <MessageBox variant="warning">Not Delivered</MessageBox>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  {order.isPaid ? (
                    <MessageBox variant="success">Paid</MessageBox>
                  ) : (
                    <MessageBox variant="warning">Not Paid</MessageBox>
                  )}
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <img
                              src={item.image.url}
                              alt={item.name}
                              className="img-fluid rounded thumbnail"
                            ></img>{" "}
                            <NavLink to={`/products/${item._id}`}>
                              {item.name}
                            </NavLink>
                          </Col>
                          <Col md={3}>
                            <span>{item.quantity}</span>
                          </Col>
                          <Col md={3}>${item.price}</Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.deliveryPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          <strong> Order Total</strong>
                        </Col>
                        <Col>
                          <strong>${order.totalPrice.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>{" "}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <div>No other data</div>
      )}

      <Button
        onClick={makePayment}
        style={{ backgroundColor: "green", margin: "0 auto" }}
      >
        {loadingPaymentResponse ? <LoadingBox color="white" /> : "Pay Now"}
      </Button>
    </Container>
  );
};

export default OrderPage;
