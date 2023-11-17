import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth, storage, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {doc, setDoc } from "firebase/firestore";
import { MdAddPhotoAlternate } from "react-icons/md";

const Register = () => {
    const [error, setError] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];    

        try {
            // create a new user
            const res = await createUserWithEmailAndPassword(auth, email, password);

            // create a storage reference
            const storageRef = ref(storage, displayName);

            // upload the file to the storage reference
            const uploadTask = await uploadBytes(storageRef, file);

            // get a downloadable url to the file in the storage reference
            const downloadURL = await getDownloadURL(uploadTask.ref);
            
            // update the authenticated users information
            await updateProfile(res.user, {
                displayName: displayName,
                photoURL: downloadURL,
            });

            // add the users information to the users collection
            await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: displayName,
                email: email, 
                photoURL: downloadURL,
            });

            // add the users information to chats collection
            await setDoc(doc(db, "userchats", res.user.uid), {})

            // navigate to home
            navigate("/login");

        } catch {
            setError(true);
            console.log(error);
        }
    }
    
    return (
        <div className="flex w-screen h-screen justify-center items-center bg-[#A8BDFE]">
            <div className="flex flex-col items-center w-1/2 p-5 bg-white rounded-xl">
                <div className="flex flex-col items-center gap-4 my-4">
                    <span className='text-2xl font-bold text-[#625E7D]'> Wavely Chat</span>
                    <span> Register For A New Account </span>
                </div>
                <form className="flex flex-col w-3/4 gap-6 my-2" onSubmit={handleSubmit}>
                    <input className="border-b-2 p-3 border-[#a7bcff]" type="text" placeholder="Display Name"/>
                    <input className="border-b-2 p-3 border-[#a7bcff]" type="email" placeholder="Email"/>
                    <input className="border-b-2 p-3 border-[#a7bcff]" type="password" placeholder="Password"/>
                    <input className="hidden border-b-2 p-3 border-[#a7bcff]" type="file" id="file"/>
                    <label className="flex items-center gap-2 hover:cursor-pointer" htmlFor="file">
                        <MdAddPhotoAlternate color="#A8BDFE" size={45} />
                        <span className="text-[#A8BDFE]"> Add An Avatar </span>
                    </label>
                    {error && <span> Something went wrong </span> }
                    <button className="bg-[#7892E6] p-3 text-white font-semibold rounded-md"> Sign Up </button>
                </form>
                <p className='my-4'> Already have an account? <span className="text-[#A8BDFE] hover:cursor-pointer"> <Link to="/login"> Login </Link> </span> </p>
            </div>
        </div>
    )
}

export default Register