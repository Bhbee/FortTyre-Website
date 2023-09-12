import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import { Store } from "../../../Store";
import { useContext } from "react";
import { OrderItems } from "../../../Types/CartItem";
import MessageBox from "../../MessageBox/MessageBox";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Card, ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsTrash3Fill } from "react-icons/bs";
import "./cart.css";

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { orderItems },
  } = state;

  const navigate = useNavigate();
  const updateCartHandler = (item: OrderItems, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item: OrderItems) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    navigate("/shippingpage");
  };

  return (
    <Container className="cart-top-container">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h3 className="cart-header">Cart</h3>

      <Row>
        <Col md={8}>
          {orderItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <NavLink to="/products">Go Shopping</NavLink>
            </MessageBox>
          ) : (
            <ListGroup>
              {orderItems.map((item: OrderItems) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <img
                        src={item.image.url}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{" "}
                      {/* <Link to={`/product/${item.slug}`}>{item.name}</Link> */}
                    </Col>
                    <Col md={2}>
                      <Button
                        className="cart-button-color"
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        // variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <AiFillMinusCircle />
                      </Button>{" "}
                      <span className="cart-button-quantity">
                        {item.quantity}
                      </span>{" "}
                      <Button
                        // variant={mode}
                        className="cart-button-color"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        {<AiFillPlusCircle />}
                      </Button>
                    </Col>
                    <Col className="cart-button" md={2}>
                      {""} {item.name}
                    </Col>
                    <Col className="cart-button" md={2}>
                      {""} ${item.price}
                    </Col>
                    {/* <Col md={1}>{item.name}</Col> */}
                    <Col md={2}>
                      <Button
                        className="cart-button-color"
                        onClick={() => removeItemHandler(item)}
                        // variant={mode}
                      >
                        <BsTrash3Fill />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({orderItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {orderItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      className="cart-button-color"
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={orderItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <Row>

        <Col className="mt-3 mb-5">
          <div style={{ textAlign: "center" }}>
            <BsCartX size="5em" color="##323643" />
          </div>
        </Col>

        <Row>
          <Col className="mt-3 mb-5">
            <h4 className="cart-headerh4">Your cart is currently empty</h4>{" "}
          </Col>
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            <Row className="mt-3">
              {listOfProducts?.products.map((product) => (
                <Col key={product.__v} sm={6} md={4} lg={3}></Col>
              ))}
            </Row>
          )}
        </Row>
      </Row> */}
    </Container>
  );
};

export default Cart;
