import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import "./breadcrumbs.css";

const BreadCrumbs: React.FC = () => {
  type BreadcrumbItem = {
    path: string;
    breadcrumb: string;
  };

  const route: BreadcrumbItem[] = [
    { path: "/", breadcrumb: "Home" },
    { path: "/cart", breadcrumb: "Cart" },
    { path: "/login", breadcrumb: "Login" },
    { path: "/signup", breadcrumb: "SignUp" },
    { path: "/fitting", breadcrumb: "Fitting" },
    { path: "/maintenance", breadcrumb: "Maintenance" },
    { path: "/servicing", breadcrumb: "Servicing" },
    { path: "/home/:productId", breadcrumb: "Product" },
  ];

  const breadcrumbs = useBreadcrumbs(route);

  console.log("breadcrumbs", breadcrumbs);

  return (
    <div className="breadcrumb">
      <Container>
        {breadcrumbs.map(({ match, breadcrumb }) => (
          <NavLink className="crumblink" key={match.pathname} to={match.pathname}>
            {breadcrumb} /
          </NavLink>
        ))}
      </Container>
    </div>
  );
};

export default BreadCrumbs;
