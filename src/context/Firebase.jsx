import React from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getDatabase, set, ref } from "firebase/database";
import { useContext, useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAWo0XR6Q8fys_0gJewvdB3CfXvZxDn5hI",
  authDomain: "sample-7dd07.firebaseapp.com",
  databaseURL: "https://sample-7dd07-default-rtdb.firebaseio.com",
  projectId: "sample-7dd07",
  storageBucket: "sample-7dd07.appspot.com",
  messagingSenderId: "552362879875",
  appId: "1:552362879875:web:33eef497c426099e37e4b6",
  measurementId: "G-CP198STJ7F",
  databaseURL: "https://sample-7dd07-default-rtdb.firebaseio.com/",
};
const FirebaseContext = createContext(null);
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
// export const database = getDatabase(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const useFirebase = () => useContext(FirebaseContext);
export const storage = getStorage(firebaseApp);
export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        setUser(user);
      } else {
        console.log("You are not logged in");
        setUser(null);
      }
    });
  }, []);

  const isLoggedIn = user ? true : false;
  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signinWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const listAllItems = () => {
    return getDocs(collection(firestore, "items"));
  };
  const listMyItems = () => {
    const q = query(
      collection(firestore, "items"),
      where("userId", "==",user.uid)
    );
    const result = getDocs(q);
    console.log(result);
    return result;
  };
  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };
  const handleCreateNewItem = async (name, price, description, cover) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${cover[name]}`
    );
    const uploadResult = await uploadBytes(imageRef, cover);

    return await addDoc(collection(firestore, "items"), {
      name,
      description,
      price,
      imageURL: uploadResult.ref.fullPath,
      userId: user.uid,
      userEmail: user.email,
    });
  };

  const handleCreateNewCart = (item)=>{
    return addDoc(collection(firestore,'cart'),{
      ...item,
      cartUserId: user.uid,
    })
  }
  const handleOrders = (item)=>{
    return addDoc(collection(firestore,'orders'),{
      ...item,
      cartUserId: user.uid,
    })
  }
  
  const listCartItems = async() =>{
  const q = query(
      collection(firestore, "cart"),
      where("cartUserId", "==",user.uid)
    );
    const result = getDocs(q);
    console.log(result);
    return result;
}
const listOrderItems = async()=>{
  const q = query(
    collection(firestore, "orders"),
    where("cartUserId", "==",user.uid)
  );
  const result = getDocs(q);
  console.log(result);
  return result;
}

  const handleDeleteCartItems = async() =>{

  }
  // const putData = (key, data) => set(ref(database, key), data);
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signinWithEmailAndPassword,
        handleCreateNewItem,
        listAllItems,
        getImageURL,
        listMyItems,
        handleCreateNewCart,
        listCartItems,
        handleOrders,
        listOrderItems,
        isLoggedIn,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
