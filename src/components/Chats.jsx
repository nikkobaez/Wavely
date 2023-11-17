import { onSnapshot, doc } from 'firebase/firestore';
import React, { useEffect, useContext, useState } from 'react'
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            // real-time listener for updates in the current user's id document in userchats
            const unsubscribe = onSnapshot(doc(db, "userchats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
    
            return () => {
                unsubscribe();
            };
        };

        currentUser.uid && getChats()
    }, [currentUser.uid])

    const handleSelect = (user) => {
        dispatch({type: "CHANGE_USER", payload: user})
    }

    return (
        <div className="flex flex-col">
            {Object.entries(chats)?.sort((a, b)=> b[1].date - a[1].date).map((chat) => (
                <div className="flex items-center gap-4 px-4 py-4 text-white hover:bg-[#2f2d52] hover:cursor-pointer" key={chat[0]} onClick={() => handleSelect(chat[1].userinfo)}>
                    <img className="bg-[#ddddf7] w-10 h-10 rounded-full object-cover" src={chat[1].userinfo.photoURL} alt="avatar" />
                    <div>
                        <span className="font-bold"> {chat[1].userinfo.displayName} </span>
                        <p className="text-sm text-[#d3d3d3] text-ellipsis overflow-hidden whitespace-nowrap w-60"> {chat[1].lastMessage?.text} </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chats