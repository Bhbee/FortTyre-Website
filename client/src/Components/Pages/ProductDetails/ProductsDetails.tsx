import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import LoadingBox from "../../LoadingBox/LoadingBox";
import MessageBox from "../../MessageBox/MessageBox";
import ApiError from "../../../Types/ApiErrortype";
import { convertProductToCartItem, getError } from "../../../Utils/ApiError";
import { useContext } from "react";
import { useGetProductDetailsBySlugQuery } from "../../../Hooks/productPageHook";
import "./productdetails.css";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();
  
 const {data: product, isLoading, error} = useGetProductDetailsBySlugQuery(productId!)

console.log("product",product);


  return (
    <Container className="product-details-top-container">
      <Helmet>
        <title>Product</title>
      </Helmet>
      <Row>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos aliquam
          iusto soluta molestiae corporis reprehenderit, repudiandae nesciunt,
          facilis nisi quo totam perferendis explicabo eum enim quam debitis
          atque molestias. Esse id minima incidunt suscipit quo ab error eum
          assumenda rerum totam, cum quisquam eos porro, ullam excepturi maiores
          nesciunt odit?
        </p>
        <Col>{productId}</Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
