import { NavLink } from "react-router-dom";
import { Product } from "../../Types/Product";
import { Card, Button } from "react-bootstrap";

import "./productitem.css";

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card className="mt-3 product-card">
      <NavLink to="">
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
        </NavLink>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button className="product-item-color">Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
