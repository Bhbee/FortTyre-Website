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
