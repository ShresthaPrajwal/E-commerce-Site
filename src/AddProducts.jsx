import React from "react";
import { useFirebase } from "./context/Firebase";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "./components/Navbar";
export default function AddProductPage() {
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [img, setImg] = React.useState("");

  const firebase = useFirebase();
  const [sucessMsg, setSucessMsg] = React.useState("");
  const [errorMsg, settErrorMsg] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(img)
    await firebase.handleCreateNewItem(title,price,description,img).then((cred)=>{
        setSucessMsg(cred);
    }).catch((error)=>{
        settErrorMsg(error);
    });
    
  };
  return (
    <>
    <Navbar/>
    <div className="flex text-center justify-center items-center  bg-white-400 w-screen text-gray-600">
      <div className="w-1/2 h-1/2">
        <div className="text-2xl m-5 p-5 md:text-5xl">Add Product</div>
        <form action="" className="flex justify-center align-middle flex-col">
          <input
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            type="text"
            className="m-2 p-2 border-2 rounded border-slate-300 focus-within:border-slate-400 "
            placeholder="Title"
          />
          <input
            required
            onChange={(e) => setPrice(e.target.value)}
            name="Price"
            value={price}
            className="m-2 p-2 border-2 rounded border-slate-300 hover:border-slate-400 "
            type="number"
            placeholder="Price"
          />
          <input
            required
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            className="m-2 p-2 border-2 rounded border-slate-300 hover:border-slate-400 "
            type="text"
            placeholder="Description"
          />
          
          <input
            type="file"
            name=""
            
            onChange={(e)=>{
                console.log(e.target.files[0])
                setImg(e.target.files[0])
            }}
            className="m-2 p-2 block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-blue-400
        hover:file:bg-violet-100
      "
          />
          <button
            type="submit"
            className="bg-slate-200 rounded m-2 p-2 hover:bg-slate-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div></>
    
  );
}
