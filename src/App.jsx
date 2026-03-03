import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Verify from "./pages/Verify";
import { userData } from "./context/UserContext";
import Loading from "./components/Loading";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import ProductPage from "./pages/ProductPage";
import Chackout from "./pages/Chackout";
import Payment from "./pages/Payment";
import OrderProccesing from "./pages/OrderProccesing";
import Orders from "./pages/Orders";
import OrderPage from "./pages/OrderPage";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const {isAuth, loading} = userData();
  return (
    <>
    {
      loading?<Loading/>
      :<BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={isAuth?<Chackout/>:<Login/>} />
          <Route path="/payment/:id" element={isAuth?<Payment/>:<Login/>} />
           <Route path="/ordersuccess" element={isAuth?<OrderProccesing/>:<Login/>} />
           <Route path="/orders" element={isAuth?<Orders/>:<Login/>} />
           <Route path="/admin/dashboard" element={isAuth?<AdminDashboard/>:<Login/>} />
           <Route path="/order/:id" element={isAuth?<OrderPage/>:<Login/>}/>
          <Route path="/product" element={<Product/>} />
          <Route path="/product/:id" element={<ProductPage/>} />
          <Route path="/cart" element={ isAuth?<Cart />:<Login/>} />
            <Route path="*" element={ <NotFound/>} />
          <Route path="/login" element={isAuth? <Home/>:<Login />} />
          <Route path="/verify" element={isAuth? <Home/>:<Verify />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    }      
    </>
  );
};

export default App;
