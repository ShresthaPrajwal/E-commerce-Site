import React from "react";
import { useFirebase } from "../context/Firebase";
import { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
// import Cards from "../components/Cards";

import Footer from "../components/Footer";
import OrdersTiles from "../components/OrdersTiles";
export default function CartPage(){
    const firebase = useFirebase();
    const [cartItems,setCartItems]=useState([])
    useEffect(() => {
        firebase.listOrderItems().then((items) => {
            setCartItems(items.docs)
        });
      }, []);
    return (
        <div>
            <Navbar />
        <div className="p-20 bg-slate-300 gap-2 place-items-center lg:grid-cols-3 md:grid-cols-2">
          {cartItems.map((item) => {
            return <OrdersTiles {...item.data()} key={item.id} />;
          })}
        </div>
        <div className="flex justify-center m-2">
          <img src="./src/assets/images/thrift.png" className="" alt="logo" />
        </div>
        <Footer/>
       
        </div>
    )
}