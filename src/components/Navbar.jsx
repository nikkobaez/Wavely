import React, { useContext } from 'react'
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser } = useContext(AuthContext); 
    return (
        <div className="flex items-center bg-[#2f2d52] h-20 p-4 justify-between text-[#ddddf7]">
            <span className="font-bold"> Wavely Chat </span> 
            <div className="flex items-center gap-4">
                <img className="bg-[#ddddf7] w-8 h-8 rounded-full object-cover" src={currentUser.photoURL} alt="avatar" />
                <span> {currentUser.displayName} </span>
                <button onClick={() => signOut(auth)} className="bg-[#5d5b8d] py-2 px-3 rounded-md text-sm"> Logout </button>
            </div>
        </div>
    )
}

export default Navbar