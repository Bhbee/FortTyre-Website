import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import { Product } from "../../../Types/Product";
import "./searchresults.css";
import ProductItem from "../../ProductItem/ProductItem";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { products } = location.state.products;
  // console.log("products", products);

  return (
    <Container className="mt-5 search-results-padding">
      <h3 style={{ textAlign: "center", color: "green", fontWeight: "bold" }}>
        Search Results
      </h3>
      <Row className="mt-3">
        {products?.map((product: Product) => (
          <Col key={product.__v} sm={6} md={4} lg={3}>
            <ProductItem product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
