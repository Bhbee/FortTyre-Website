import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ListGroup, Card, Badge, Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import LoadingBox from "../../LoadingBox/LoadingBox";
import MessageBox from "../../MessageBox/MessageBox";
import ApiError from "../../../Types/ApiErrortype";
import { Store } from "../../../Store";
import { convertProductToCartItem, getError } from "../../../Utils/ApiError";
import { useContext, useEffect } from "react";
import { useGetProductDetailsBySlugQuery } from "../../../Hooks/productPageHook";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./productdetails.css";

const ProductDetails: React.FC = () => {
  const { productId } = useParams();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsBySlugQuery(productId!);

  const getProductById = async () => {
    if (productId !== "") {
      // console.log("productId", productId);
      await refetch();
      // console.log("refetch");
    }
  };

  useEffect(() => {
    getProductById();
  }, [productId]);

  const addToCartHandler = () => {
    const existItem = cart.orderItems.find((x) => x.name === product!.brand);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      alert("product is out of stock");
      toast.warn("Sorry. Product is out of stock");
      return;
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success("Product added to the cart");
    //  navigate("/cart");
  };

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product not found</MessageBox>
  ) : (
    <Container className="product-details-top-container">
      <Helmet>
        <title>Product</title>
      </Helmet>
      <Row>
        <Col md={4}>
          <img
            style={{ width: "400px", maxWidth: "100%" }}
            src={product.image.url}
            alt={product._id}
          />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.brand}</title>
              </Helmet>
              <h1>{product.brand}</h1>
            </ListGroup.Item>
            <ListGroup.Item>size: {product.size}</ListGroup.Item>

            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          {" "}
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        className="product-details-atc-button"
                        onClick={addToCartHandler}
                        variant="primary"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
