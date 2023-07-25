import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Outlet, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Product, ProductList } from "../../../Types/Product";
import "./productlisting.css";
import { useGetProductsQuery } from "../../../Hooks/productHook";

const ProductsListing: React.FC = () => {
  // const {data: products, isLoading, error} = useGetProductsQuery()

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Tyres</title>
      </Helmet>
      <Row>
        <Col></Col>
      </Row>
      <Outlet />
    </Container>
  );
};

export default ProductsListing;
