import logonew from "../../Assets/logonew.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
// import BreadCrumbs from "../BreadCrumbs/BreadCrumb";
import React, { useContext, useState } from "react";
import { useGetFilterSearchQuery } from "../../Hooks/filterSearchHook";
// import FilterSelect from "../FilterSelect/FilterSelect";
import { Store } from "../../Store";
import { Badge } from "react-bootstrap";
import SearchResults from "../Pages/SearchResults/SearchResults";
import { Product } from "../../Types/Product";
import "./layout.css";

const Layout: React.FC = () => {
  const {
    state: { cart, userAccessToken },
    dispatch,
  } = useContext(Store);

  // console.log("USER_ACCESS_TOKEN", userAccessToken?.accessToken);

  const [search, setSearch] = useState("");
  const [showDropdown, setshowDropdown] = useState(false);

  const navigate = useNavigate();

  const autoCompleteOptions = [
    { name: "Eternity", id: 1 },
    { name: "Himitto", id: 2 },
    { name: "Infinity", id: 3 },
    { name: "Road Wind", id: 4 },
    { name: "Joyraod", id: 5 },
    { name: "Westlake", id: 6 },
  ];

  const {
    data: filterSearchProducts,
    isLoading,
    error,
    refetch,
  } = useGetFilterSearchQuery(search);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    try {
      await refetch().then((result) =>
        navigate("/searchresults", { state: { products: result.data } })
      );
      // console.log("isLoading", isLoading);
      // console.log("searchProducts", filterSearchProducts);
      setSearch("");
    } catch (err) {}
  };

  // const handleSelect = (filter: string) => {
  //   // setSelect(filter);
  //   console.log("filter", filter);
  // };

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    setshowDropdown(false);
  };

  const handleInputChange = (e: any) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    setshowDropdown(newSearch !== "");
  };
  // const checkSearch = () => {
  //   if(search !== "") {
  //     setshowDropdown(true);
  //   }
  // };

  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userRegistered");
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("orderItems");
    localStorage.removeItem("deliveryAddress");
  };

  // console.log("filterSearchProducts", filterSearchProducts);

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
            <Form
              className="d-flex form-width"
              // onSubmit={onSubmit}
            >
              {/* <FilterSelect onChange={handleSelect} /> */}

              <Form.Control
                value={search}
                onChange={handleInputChange}
                type="search"
                placeholder="Search by brand or size... (Eg 205/65/16 or Michelin)"
                className="me-2 layout-search-input"
                aria-label="Search"
              />

              <Nav.Link
                as={NavLink}
                to="../searchresults"
                href="../searchresults"
              >
                <Button
                  variant="outline-success"
                  className="layout-search-btn"
                  onClick={onSubmit}
                >
                  Search
                </Button>
              </Nav.Link>
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

            {userAccessToken ? (
              <DropdownButton
                id="dropdown-basic-button"
                title={`Hi ${userAccessToken.firstName}`}
                style={{ borderRadius: "38px" }}
              >
                {/* <RiAccountCircleFill className="layout-icon-margin layout-icon" /> */}
                <Dropdown.Item onClick={logoutHandler} href="#/action-1">
                  Logout
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <Nav.Link
                as={NavLink}
                to="../login"
                className="nav-social-links"
                href="../login"
              >
                <RiAccountCircleFill className="layout-icon-margin layout-icon" />{" "}
                <p className="cart-paragraph">Login</p>
              </Nav.Link>
            )}

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

      {showDropdown && (
        <div className="autocomplete">
          {autoCompleteOptions
            .filter((item) => {
              const searchTerm = search.toLocaleLowerCase();
              const name = item.name.toLocaleLowerCase();

              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
              );
            })
            .map((item) => (
              <div
                className="dropdown-item"
                onClick={() => onSearch(item.name)}
                key={item.id}
              >
                {item.name}
              </div>
            ))}
        </div>
      )}

      {/* <BreadCrumbs /> */}
    </header>
  );
};

export default Layout;
