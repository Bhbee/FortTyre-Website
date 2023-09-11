import { NavLink } from "react-router-dom";
import { Product } from "../../Types/Product";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useContext } from "react";
import { Store } from "../../Store";
import { OrderItems } from "../../Types/CartItem";
import { convertProductToCartItem } from "../../Utils/ApiError";
import "./productitem.css";

const ProductItem = ({ product }: { product: Product }) => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { orderItems },
  } = state;

  const addToCartHandler = (item: OrderItems) => {
    const existItem = orderItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      console.log("product", product);
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    })
    toast.success("Product added to the cart");
  };

  return (
    <Card className="mt-3 product-card">
      <NavLink to={`products/${product._id}`}>
        {/* <img src={product.image.url} alt="tyre" className="image-fluid" /> */}
        <Card.Img
          src={product.image.url}
          alt={product.brand}
          className="img-width"
        />
      </NavLink>
      <Card.Body>
        <NavLink style={{ textDecoration: "none", color: "black" }} to="">
          <Card.Title>{product.brand}</Card.Title>
          <Card.Text className="mb-2">
            <span>&#8358;</span>
            {product.price}
          </Card.Text>
          <Card.Text className="mb-2">{product.size}</Card.Text>
        </NavLink>
        {product.countInStock === 0 ? (
          <Button className="product-item-button" variant="danger">
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
            className="product-item-button"
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
