import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./products.css";
import { useGetProductsQuery } from "../../Hooks/productHook";
import LoadingBox from "../LoadingBox/LoadingBox";
import MessageBox from "../MessageBox/MessageBox";
import { getError } from "../../Utils/ApiError";
import ApiError from "../../Types/ApiErrortype";
import ProductItem from "../ProductItem/ProductItem";

const Products: React.FC = () => {
  const style = {
    backgroundColor: "#C8FFC8",
    padding: "20px",
  };

  const { data: listOfProducts, isLoading, error } = useGetProductsQuery();

    console.log("listOfProducts", listOfProducts);

  return (
    <Container style={style} fluid className="mt-5">
      <Container>
        <h3 className="product-text mb-3">Products</h3>
      </Container>
      <div className="custom-shape-divider-bottom-1688987183">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <Row className="mt-3">
          {listOfProducts?.products.map((product) => (
            <Col key={product.__v} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;
