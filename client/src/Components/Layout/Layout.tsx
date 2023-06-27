import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { RiAccountCircleLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAdminFill } from "react-icons/ri";

import "./layout.css";

const Layout: React.FC = () => { 
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="nav-bgcolor mt-2 mb-2"
        // fixed="top"
      >
        <Container>
          <NavLink to="/" className="layout-brand-logo">
            Fort Tyres
          </NavLink>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="nav-container"
          />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="mt-3 nav-container nav-collapse-container"
          >
            <Form className="d-flex form-width">
              <Form.Control
                type="search"
                placeholder="Search products, size & brands"
                className="me-2"
                aria-label="Search"
              />

              <Button variant="outline-success" className="layout-search-btn">
                Search
              </Button>
            </Form>

            <Nav className="layout-nav-dropdown">
              <RiAccountCircleLine className="layout-icon-margin layout-icon" />
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.3">
                  <NavLink to="./account/login" className="nav-social-links">
                    Login
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  <NavLink to="./account/signup" className="nav-social-links">
                    Sign Up
                  </NavLink>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <Nav>
              <NavLink to="admin" className="nav-social-links">
                <RiAdminFill className="layout-icon-margin layout-icon" /> Admin
              </NavLink>

              <NavLink to="cart" className="nav-social-links">
                <AiOutlineShoppingCart className="layout-icon-margin layout-icon" />{" "}
                Cart
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Layout;
