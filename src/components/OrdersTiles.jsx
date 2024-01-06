import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {  useFirebase } from "../context/Firebase";

export default function OrdersTiles(props){
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [url,setURL]= useState(null);
    const [orderSucess,setOrderSucess]=useState(null);
    useEffect(()=>{
        firebase.getImageURL(props.imageURL).then((url)=>setURL(url))
    },[])
    const handleClick = ()=>{
        console.log(props)
        navigate(`products/${props.name}`,{state:{product: props , imgUrl : url}})
    }
    const handleOrder = async ()=>{
        await firebase.handleOrders(props).then(()=>{
            setOrderSucess(true)
        })
    }
    

    return (
        <div   className="m-10 flex-auto bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:z-0 hover:shadow-xl md:flex ">
        
            <img src={url}
                    alt="Product" className="w-auto h-auto object-cover rounded-t-xl md:w-32 md:rounded-xl md:m-2" />
            <div className="px-4 py-3 flex-auto" >
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{props.name}</p>
                <div className="flex-col items-center justify-center md:flex-row ">
                    <p className="p-2 text-lg font-semibold text-black cursor-auto my-3">${props.price}</p>
                    {/* <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">$199</p>
                    </del> */}
                    <button onClick={handleOrder} className="button ml-auto rounded-xl p-3  text-red-400 bg-gray-100 md:p-3 hover:bg-gray-200">
                            Cancel Order</button>
                </div>
            </div>
                    {orderSucess && (<>Ordered Sucessfully</>)}
    </div>
        
    )
}