import React from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import { useState ,useMemo } from "react";
import { useEffect } from "react";
import { useFirebase } from "../context/Firebase";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
export default function HomePage() {
  const firebase = useFirebase();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    firebase.listAllItems().then((items) => setProducts(items.docs));
  }, []);
  const memoizedHomePage = useMemo(() => {
    return (
      <div className="">
        <Navbar />
        <div className="bg-slate-300 grid grid-cols-1 gap-2 place-items-center md:grid-cols-3">
          {products.map((item) => {
            return <Cards {...item.data()} key={item.id} />;
          })}
        </div>
        <div className="flex justify-center m-2">
          <img src="./src/assets/images/thrift.png" className="" alt="logo" />
        </div>
        
        <Footer/>
      </div>
    );
  }, [products]); // Memoize the home page based on the products

  return memoizedHomePage;
}
