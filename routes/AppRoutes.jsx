import { Routes, Route } from "react-router-dom";
import Splash from "./src/pages/splash";
import Home from "../src/pages/Home"; 
import ProductInfo from "../src/pages/ProductInfo";
import Cart from "../src/pages/Cart";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:id" element={<ProductInfo/>} />
      <Route path="/cart" element={<Cart />} />
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
