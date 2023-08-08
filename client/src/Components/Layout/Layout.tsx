import logonew from "../../Assets/logonew.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
// import BreadCrumbs from "../BreadCrumbs/BreadCrumb";
import { useContext, useState } from "react";
import { useGetFilterSearchQuery } from "../../Hooks/filterSearchHook";
import useDebounceValue from "../../Hooks/useDebounceValue";
import { Store } from "../../Store";
import "./layout.css";
import { Badge } from "react-bootstrap";
import { Product } from "../../Types/Product";

const Layout: React.FC = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

  const [search, setSearch] = useState("");

  const debouncedSearchTerm = useDebounceValue(search, 500);

  const {
    data: filterSearchProducts,
    isLoading,
    error,
  } = useGetFilterSearchQuery(debouncedSearchTerm);

  console.log("filterSearchProducts", filterSearchProducts);

  return (
    <header className="layout-position">
      <Navbar collapseOnSelect expand="lg" className="nav-bgcolor">
        <Container>
          <NavLink to="/">
            <img src={logonew} alt="logo" className="layout-logo image-fluid" />
          </NavLink>

          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ border: "none" }}
          />

          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="mt-3 nav-container nav-collapse-container"
          >
            <Form className="d-flex form-width">
              <Form.Control
                // value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Search by product or size... (Eg 205/65/16 or Michelin) "
                className="me-2"
                aria-label="Search"
              />
              {/* 
              <Button variant="outline-success" className="layout-search-btn">
                Search
              </Button> */}
            </Form>
            {/* <Button variant={mode}>
              <i>{mode === "light" ? <BsFillSunFill /> : <BsFillMoonFill />}</i>
            </Button> */}

            <Nav.Link
              as={NavLink}
              to="../signup"
              className="nav-social-links"
              href="../signup"
            >
              <SiGnuprivacyguard className="layout-icon-margin layout-icon" />{" "}
              <p className="cart-paragraph">Sign Up</p>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="../login"
              className="nav-social-links"
              href="../login"
            >
              <RiAccountCircleFill className="layout-icon-margin layout-icon" />{" "}
              <p className="cart-paragraph">Login</p>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/cart"
              className="nav-social-links"
              href="/cart"
            >
              <AiOutlineShoppingCart className="layout-icon-margin layout-icon" />{" "}
              <p className="cart-paragraph">Cart</p>
              {cart.orderItems.length > 0 && (
                <Badge className="badge-pill" pill bg="dark">
                  {cart.orderItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* {
        <div className="search-results">
          {isLoading && <div>Loading...</div>}
          {filterSearchProducts! &&
            filterSearchProducts.products.map((product: Product) => (
              <div className="border-bottom" key={product._id}>
                {product.brand}
              </div>
            ))}
        </div>
      } */}
      {      <div >
        {search !== "" && (
          <div className="search-results">
            {isLoading && <div>Loading...</div>}
            {filterSearchProducts &&
              filterSearchProducts.products.map((product) => (
                <div className="border-bottom" key={product._id}>
                  {product.brand}
                </div>
              ))}
          </div>
        )}
      </div>
}
      {/* <BreadCrumbs /> */}
    </header>
  );
};

export default Layout;
