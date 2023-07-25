import {NavLink} from "react-router-dom";
import { ProductList } from "../../Types/Product";
import { Card, Button } from "react-bootstrap";


const ProductItem = ({product}:{product: ProductList} ) => {
  return (
    
      <Card>
        <NavLink to="">
            <img src="" alt="" />
        </NavLink>
        <Card.Body>
          <NavLink to="">
            <Card.Title></Card.Title>
            <Card.Text></Card.Text>
            <Button>Add to Cart</Button>
          </NavLink>
        </Card.Body>
      </Card>
  );
};

export default ProductItem;
