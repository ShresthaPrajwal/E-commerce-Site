import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "./context/Firebase";

export default function SignUpPage(){
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const [successMsg,setSuccessMsg]=useState('')
    const [errorMsg,setErrorMsg]=useState('')

    const firebase = useFirebase();
    console.log(firebase)
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('Form data submitted:', formData);
        console.log(firebase)
        await firebase.signupUserWithEmailAndPassword(formData.email,formData.password).then((userCred)=>{
            const user = userCred.user;
            console.log(user)
        }).catch((err)=>{
            console.log(err)
        })
        history
        
    }

    return(
        <div className="flex text-center justify-center items-center  bg-white-400 h-screen w-screen text-gray-600">
            <div className="w-1/2 h-1/2">
            <div className="text-2xl m-5 p-5 md:text-5xl">Sign Up</div>
            <form action="" className="flex justify-center align-middle flex-col">
                
                <input required onChange={handleChange} name="email" value={formData.email} className="m-2 p-2 border-2 rounded border-slate-300 focus-within:border-slate-400 " type="email" placeholder="Email"/>
                <input required onChange={handleChange} name="password" value={formData.password} className="m-2 p-2 border-2 rounded border-slate-300 hover:border-slate-400 " type="password" placeholder="Password"/>
                <button type="submit" className="bg-slate-200 rounded m-2 p-2 hover:bg-slate-300" onClick={handleSubmit}>Submit</button>
            </form>
            <div>Already have an account?<Link className="p-2 text-green-300 hover:text-green-600" to={"/signin"}>SignIn</Link></div>
            </div>
        </div>
        
    )
}