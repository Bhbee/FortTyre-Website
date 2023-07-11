import { AiOutlineHome } from "react-icons/ai";
import { LuContact } from "react-icons/lu";
import { RiAccountCircleFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { NavLink } from "react-router-dom";

const MobileFooterNav: React.FC = () => {
  return (
    <nav>
      <NavLink to="" className="mobile-footer-link">
        <AiOutlineHome />
      </NavLink>
      <NavLink to="" className="mobile-footer-link">
        <LuContact />
      </NavLink>
      <NavLink to="" className="mobile-footer-link">
        <SiGnuprivacyguard />
      </NavLink>
      <NavLink to="" className="mobile-footer-link">
        {" "}
        <RiAccountCircleFill />
      </NavLink>
    </nav>
  );
};

export default MobileFooterNav;
