import React, { useContext, useState, useEffect } from 'react'
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from "../firebase";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { state } = useContext(ChatContext);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        })

        return () => {
            unsubscribe()
        }
    }, [state.chatId])

    return (
        <div className='bg-[#ddddf7] flex-[1] p-4 overflow-y-auto'>
            {messages.map((message) => (
                <Message message={message} key={message.id}/>
            ))}
        </div>
    )
}

export default Messages