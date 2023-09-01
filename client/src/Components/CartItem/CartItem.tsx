import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Store } from "../../Store";
import { OrderItems } from "../../Types/CartItem";
import { Product } from "../../Types/Product";

const CartItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { orderItems },
  } = state;

  const updateCartHandler = (item: OrderItems, quantity: number) => {
    if (item.quantity < product.countInStock) {
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

  return (
    <Container>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default CartItem;
