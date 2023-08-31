import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductItem from "../../ProductItem/ProductItem";
import { BsCartX } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import { Store } from "../../../Store";
import { useContext } from "react";
import { OrderItems } from "../../../Types/CartItem";
import { useGetProductsQuery } from "../../../Hooks/productHook";
import "./cart.css";
import LoadingBox from "../../LoadingBox/LoadingBox";
import MessageBox from "../../MessageBox/MessageBox";
import { getError } from "../../../Utils/ApiError";
import ApiError from "../../../Types/ApiErrortype";
import { Product } from "../../../Types/Product";
import CartItem from "../../CartItem/CartItem";

const Cart: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { orderItems },
  } = state;

  const { data: listOfProducts, isLoading, error } = useGetProductsQuery();
  console.log("listOfProducts", listOfProducts?.products);

  

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
          {isLoading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">
              {getError(error as ApiError)}
            </MessageBox>
          ) : (
            <Row className="mt-3">
              {listOfProducts?.products.map((product) => (
                <Col key={product.__v} sm={6} md={4} lg={3}>
                  <CartItem product={product} />
                </Col>
              ))}
            </Row>
          )}
        </Row>
      </Row>
    </Container>
  );
};

export default Cart;
