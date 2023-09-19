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

  // console.log("listOfProducts", listOfProducts);

  return (
    <Container style={style} fluid>
      <Container>
        <h3 className="product-text mb-3">Products</h3>
      </Container>

      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <Row className="mt-3">
          {listOfProducts?.products.map((product) => (
            <Col key={product._id} sm={6} md={4} lg={3}>
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;
