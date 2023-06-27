import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { sampleProducts } from "../../sampleProducts";
import { Outlet } from "react-router-dom";
import "./productlisting.css";

const ProductsListing: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <ul>
            {sampleProducts.map((product) => (
              <li key={product.slug}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
                <h2>{product.name}</h2>
                <p>{product.price}</p>
              </li>
            ))}
          </ul>
          <h3>Lists of our products</h3>
        </Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default ProductsListing;
