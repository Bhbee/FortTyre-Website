import logo from "../../Assets/logo.jpg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";

import "./layout.css";

const Layout: React.FC = () => {
  return (
    <header className="layout-position">
    <Navbar collapseOnSelect expand="lg" className="nav-bgcolor">
        <Container>
          <NavLink to="/">
            <img src={logo} alt="logo" className="layout-logo" />
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
                type="search"
                placeholder="Search tyres here... (Eg 1955/65R15) "
                className="me-2"
                aria-label="Search"
              />

              <Button variant="outline-success" className="layout-search-btn">
                Search
              </Button>
            </Form>

            <Nav.Link
              as={NavLink}
              to="/cart"
              className="nav-social-links"
              href="/cart"
            >
              <AiOutlineShoppingCart className="layout-icon-margin layout-icon" />{" "}
              <p className="cart-paragraph">Cart</p>
            </Nav.Link>

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
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Layout;
