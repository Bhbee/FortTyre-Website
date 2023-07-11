import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import ProductsListing from "./Pages/ProductListing/ProductsListing";
import ProductsDetails from "./Pages/ProductsDetails";
import Cart from "./Pages/Cart/Cart";
import Terms from "../Components/Pages/Terms";
import SignUp from "./Pages/Signup/SignUp";
import LogIn from "./Pages/Login/LogIn";
import Error404Page from "./Pages/Error404Page/Error404Page";
import { Routes, Route } from "react-router-dom";


const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />

      <Route path="premiumproducts" element={<ProductsListing />}>
        <Route path=":productId" element={<ProductsDetails />} />
      </Route>

      <Route path="cart" element={<Cart />} />
      <Route path="terms" element={<Terms />} />

      <Route path="signup" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />

      <Route path="*" element={<Error404Page />} />
    </Routes>
  );
};

export default AppRouter;
