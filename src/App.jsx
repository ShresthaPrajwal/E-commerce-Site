import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/Home";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import AddProductPage from "./pages/AddProducts";
import ProductDetail from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import CartPage from "./pages/CartPage";
import Orders from "./pages/Orders";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <HomePage />  } />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/products" element={<ProductDetail />} >
          <Route path=':productId' element={<ProductDetail />} />
        </Route>
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/myproduct" element={<MyProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
