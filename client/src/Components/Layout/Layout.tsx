import logo from "../../Assets/logo.jpg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import { NavbarProps } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";

import "./layout.css";

const Layout: React.FC = () => {
  return (
    <header className="layout-position">
      <div className="layout-text">
        <Container>
          <Nav className="top-nav">
            <NavLink to="../login" className="top-nav-links">
              LOGIN
            </NavLink>
            <NavLink to="../signup" className="top-nav-links">
              REGISTER
            </NavLink>
          </Nav>
        </Container>
      </div>
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

              <hr />
            <div className="border-bottom"></div>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Layout;
