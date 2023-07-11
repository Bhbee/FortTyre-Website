import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { PremiumTyreBrands } from "../../ProductBrands/premiumTyreBrands";
import { Outlet, NavLink } from "react-router-dom";
import "./productlisting.css";

const ProductsListing: React.FC = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Row className="mt-3 product-row">
          {PremiumTyreBrands.map((product) => (
            <Col key={product.slug} sm={6} md={4} lg={3}>
              <NavLink to={`products/${product.slug}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image mt-3"
                />
                <h3 className="mt-3">{product.name}</h3>
                <p className="mt-3">&#8358;{product.price}</p>
              </NavLink>
            </Col>
          ))}
        </Row>
      </Row>
      <Outlet />
    </Container>
  );
};

export default ProductsListing;
