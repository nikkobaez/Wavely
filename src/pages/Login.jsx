import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
     const [error, setError] = useState(false);
     const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");
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
                    <span> Log In To Your Account </span>
                </div>
                <form className="flex flex-col w-3/4 gap-6 my-2" onSubmit={handleSubmit}>
                    <input className="border-b-2 p-3 border-[#a7bcff]" type="email" placeholder="Email"/>
                    <input className="border-b-2 p-3 border-[#a7bcff]" type="password" placeholder="Password"/>
                    {error && <span> Something went wrong </span> }
                    <button className="bg-[#7892E6] p-3 text-white font-semibold rounded-md"> Log In </button>
                </form>
                <p className='my-4'> Don't have an account? <span className="text-[#A8BDFE] hover:cursor-pointer"> <Link to="/register"> Register </Link> </span> </p>
            </div>
        </div>
    )
}

export default Login