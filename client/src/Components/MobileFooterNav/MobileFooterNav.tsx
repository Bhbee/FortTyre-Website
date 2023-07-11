import { AiOutlineHome } from "react-icons/ai";
import { LuContact } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { NavLink } from "react-router-dom";
import "./mobilefooternav.css";

const MobileFooterNav: React.FC = () => {
  return (
    <nav>
      <NavLink to="" className="mobile-footer-link">
        <AiOutlineHome /><p>Home</p>
      </NavLink>
      <NavLink to="" className="mobile-footer-link">
        <LuContact /><p>Contact</p>
      </NavLink>
      <NavLink to="" className="mobile-footer-link">
        <SiGnuprivacyguard /><p>Register</p>
      </NavLink>
      <NavLink to="" className="mobile-footer-link">
        <RiAccountCircleFill /><p>Login</p>
      </NavLink>
    </nav>
  );
};

export default MobileFooterNav;
