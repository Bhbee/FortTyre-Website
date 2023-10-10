import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Store } from "../../../Store";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../../../Hooks/orderHook";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import { Helmet } from "react-helmet-async";
import { Button, Card, ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LoadingBox from "../../LoadingBox/LoadingBox";
import { MdEdit } from "react-icons/md";
import "./placeorder.css";

const PlaceOrder: React.FC = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart, userAccessToken } = state;

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.orderItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.deliveryPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

  cart.totalPrice = cart.itemsPrice + cart.deliveryPrice;

  const { mutateAsync: createOrder, isLoading } = useCreateOrderMutation();

  const placeOrderHandler = async () => {
    try {
      const data = await createOrder({
        orderItems: cart.orderItems,
        deliveryAddress: cart.deliveryAddress,
        itemPrice: cart.itemsPrice,
        deliveryPrice: cart.deliveryPrice,
        totalPrice: cart.totalPrice,
      });
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem("orderItems");
      console.log("Data_Response_placeOrder", data);
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="place-order-blob-divider">
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h3 className="my-5 preview-order-text">Preview Order</h3>

      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", color: "green" }}>
                Shipping
              </Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.deliveryAddress.fullname} <br />
                <strong>Address: </strong> {cart.deliveryAddress.address},
                {cart.deliveryAddress.city},{cart.deliveryAddress.country}
              </Card.Text>
              <NavLink className="place-order-edit-btn" to="/shippingpage">
                <MdEdit /> Edit
              </NavLink>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", color: "green" }}>
                Items
              </Card.Title>
              <ListGroup variant="flush">
                {cart.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>{item.name}</Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <NavLink className="place-order-edit-btn" to="/cart">
                <MdEdit /> Edit
              </NavLink>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title style={{ fontWeight: "bold", color: "green" }}>
                Order Summary
              </Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${cart.deliveryPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid button.btn.btn-primary">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.orderItems.length === 0 || isLoading}
                    >
                      {isLoading ? <LoadingBox color="white" /> : "Place Order"}
                    </Button>
                    <div style={{ marginTop: "0.5rem" }}></div>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrder;
