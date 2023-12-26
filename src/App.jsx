import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./Home";
import SignInPage from "./SignIn";
import SignUpPage from "./SignUp";
import AddProductPage from "./AddProducts";
import ProductDetail from "./ProductDetails";


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
      </Routes>
    </Router>
  );
}

export default App;
