import React from "react";
import { useFirebase } from "../context/Firebase";
import { useState ,useEffect} from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
export default function MyProducts(){
    const firebase = useFirebase();
    const [products,setProducts]=useState([])
    useEffect(() => {
        firebase.listMyItems().then((items) => {
            setProducts(items.docs)
        });
      }, []);
    return (
        <div>
            <Navbar />
        <div className="bg-slate-300 grid grid-cols-1 gap-2 place-items-center lg:grid-cols-3 md:grid-cols-2">
          {products.map((item) => {
            return <Cards {...item.data()} key={item.id} />;
          })}
        </div>
        <div className="flex justify-center m-2">
          <img src="./src/assets/images/thrift.png" className="" alt="logo" />
        </div>
        <Footer/>
       
        </div>
    )
}