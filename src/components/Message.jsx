import React, { useContext, useRef, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';


const Message = ({message}) => {
    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext);
    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior: "smooth"})
    }, [message])

    return (
        <div ref={ref} className={`flex ${message.senderId === currentUser.uid ? "flex-row-reverse" : ""} gap-4 mb-10`}>
            <div className="flex flex-col gap-2 w-14">
                <img className="bg-[#ddddf7] w-10 h-10 rounded-full object-cover" 
                src={message.senderId === currentUser.uid ? currentUser.photoURL : state.user.photoURL}
                alt="avatar" />
                <span className="flex w-16 text-sm font-thin"> Just Now </span>
            </div>
            <div className={`flex flex-col ${message.senderId === currentUser.uid ? "items-end" : "items-start"} gap-4 max-w-[50%]`}>
                <p className={`flex items-center justify-center px-4 py-2 ${message.senderId === currentUser.uid ? "bg-[#8da4f1] text-white rounded-b-md rounded-tl-md" : "bg-white text-black rounded-b-md rounded-tr-md"}`}> {message.text} </p>
                {message.image && <img src={message.image} alt = ""/>}
            </div>
        </div>
    )
}

export default Message