import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BsCartX } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import "./cart.css";
import { Store } from "../../../Store";
import { useContext } from "react";
import { OrderItems } from "../../../Types/CartItem";
import { useGetProductsQuery } from "../../../Hooks/productHook";

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { orderItems },
  } = state;

  const { data: listOfProducts, isLoading, error } = useGetProductsQuery();
  console.log("listOfProducts", listOfProducts?.products);

  const updateCartHandler = (item: OrderItems, quantity: number) => {
  
  };

  return (
    <Container className="mt-5 cart-top-container">
      <Row>
        <Helmet>
          <title>Cart</title>
        </Helmet>
        <h3 className="cart-header">Cart</h3>

        <Col className="mt-3 mb-5">
          <div style={{ textAlign: "center" }}>
            <BsCartX size="5em" color="##323643" />
          </div>
        </Col>
        <Row>
          <Col className="mt-3 mb-5">
            <h4 className="cart-headerh4">Your cart is currently empty</h4>{" "}
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default Cart;
