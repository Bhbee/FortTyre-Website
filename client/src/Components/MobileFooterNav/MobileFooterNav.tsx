import { AiOutlineHome } from "react-icons/ai";

import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Store } from "../../Store";
import { useContext } from "react";
import "./mobilefooternav.css";
import { Badge } from "react-bootstrap";

const MobileFooterNav: React.FC = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);

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
      <NavLink to="../login" className="mobile-footer-link">
        <RiAccountCircleFill className="mobile-footer-icon" />
        <p>Login</p>
      </NavLink>
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
