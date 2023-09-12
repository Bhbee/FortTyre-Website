import { AiOutlineHome } from "react-icons/ai";
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Store } from "../../Store";
import { useContext } from "react";
import { Badge } from "react-bootstrap";
import "./mobilefooternav.css";

const MobileFooterNav: React.FC = () => {
  const {
    state: { cart, userAccessToken },
    dispatch,
  } = useContext(Store);

  const logoutHandler = () => {
    dispatch({ type: "USER_LOGOUT" });
    localStorage.removeItem("userRegistered");
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("orderItems");
    localStorage.removeItem("deliveryAddress");
  };

  return (
    <nav>
      <NavLink to="/" className="mobile-footer-link">
        <AiOutlineHome className="mobile-footer-icon" />
        <p>Home</p>
      </NavLink>
      <NavLink to="../signup" className="mobile-footer-link">
        <SiGnuprivacyguard className="mobile-footer-icon" />
        <p>Sign Up</p>
      </NavLink>
      {userAccessToken ? (
        <NavLink to="" className="mobile-footer-link" onClick={logoutHandler}>
          <RiAccountCircleFill className="mobile-footer-icon" />
          <p>Logout</p>
        </NavLink>
      ) : (
        <NavLink to="../login" className="mobile-footer-link">
          <RiAccountCircleFill className="mobile-footer-icon" />
          <p>Login</p>
        </NavLink>
      )}
      {/* <NavLink to="../login" className="mobile-footer-link">
        <RiAccountCircleFill className="mobile-footer-icon" />
        <p>Login</p>
      </NavLink> */}

      <NavLink to="../cart" className="mobile-footer-link">
        {cart.orderItems.length > 0 && (
          <Badge className="badge-pill" pill bg="dark">
            {cart.orderItems.reduce((a, c) => a + c.quantity, 0)}
          </Badge>
        )}

        <AiOutlineShoppingCart className="mobile-footer-icon" />
        <p>Cart</p>
      </NavLink>
    </nav>
  );
};

export default MobileFooterNav;
