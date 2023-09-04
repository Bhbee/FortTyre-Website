import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useContext } from "react";
import { Store } from "../../Store";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const {
    state: { userAccessToken },
  } = useContext(Store);
  return userAccessToken ? <Outlet /> : <Navigate to="../login" />;
};

export default ProtectedRoutes;
