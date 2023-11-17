import React, { useContext } from 'react'
import { FaVideo } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoIosMore } from "react-icons/io";
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
    const { state } = useContext(ChatContext);

    return (
        <div className='flex-[2] flex flex-col h-full bg-red-100'>
            <div className="h-20 bg-[#5d5b8d] flex items-center justify-between px-4 text-white">
                <span> {state?.user.displayName}</span>
                <div className="flex gap-4">
                    <FaVideo size={25} color="white" className="hover:cursor-pointer"/>
                    <IoPersonAddSharp size={25} color="white" className="hover:cursor-pointer"/>
                    <IoIosMore size={25} color="white" className="hover:cursor-pointer"/>
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat