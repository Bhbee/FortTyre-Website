import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Cart from "./Pages/Cart/Cart";
import Terms from "../Components/Pages/Terms";
import SignUp from "./Pages/Signup/SignUp";
import LogIn from "./Pages/Login/LogIn";
import Error404Page from "./Pages/Error404Page/Error404Page";
import Fitting from "./Pages/Fitting/FIitting";
import Servicing from "./Pages/Servicing/Servicing";
import Maintenance from "./Pages/Maintenance/Maintenance";
import { Routes, Route } from "react-router-dom";
import Products from "./Products/Products";
import ForgotPassword from "./Pages/ForgotPasword/ForgotPassword";
import ProductDetails from "./Pages/ProductDetails/ProductsDetails";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import SearchResults from "./Pages/SearchResults/SearchResults";
import ShippingPage from "./Pages/ShippingPage/ShippingPage";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import OrderPage from "./Pages/OrderPage/OrderPage";
import HtmlContentPage from "./Pages/HtmlContentPage/HtmlContentPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="products/:productId" element={<ProductDetails />} />
      <Route
        path="searchresults/products/:productId"
        element={<ProductDetails />}
      />
      <Route path="googleconsentform" element={<HtmlContentPage/>}/>
      <Route element={<ProtectedRoutes />}>
        <Route path="shippingpage" element={<ShippingPage />} />
        <Route path="placeorder" element={<PlaceOrder />}></Route>
        <Route path="/order/:id" element={<OrderPage />} />
      </Route>
      <Route path="searchresults" element={<SearchResults />} />
      <Route path="about" element={<About />} />
      <Route path="fitting" element={<Fitting />} />
      <Route path="maintenance" element={<Maintenance />} />

      <Route path="servicing" element={<Servicing />} />
      <Route path="cart" element={<Cart />} />
      <Route path="terms" element={<Terms />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="forgotpassword" element={<ForgotPassword />} />
      <Route path="resetpassword" element={<ResetPassword />} />
      <Route path="login" element={<LogIn />} />
      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default AppRouter;
