import React, { useContext, useState } from 'react'
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuid }  from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, db } from '../firebase';


const Input = () => {
    const [text, setText] = useState("")
    const [image, setImage] = useState(null);
    const [error, setError] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { state } = useContext(ChatContext); 

    const handleSend = async () => {
        if (image) {
            try {
                const storageRef = ref(storage, uuid());
                const uploadTask = await uploadBytes(storageRef, image);
                const downloadURL = await getDownloadURL(uploadTask.ref);
                await updateDoc(doc(db, "chats", state.chatId), {
                    messages: arrayUnion({
                        id: uuid(),
                        text: text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        image: downloadURL,
                    })
                });
            } catch {
                setError(false);
                console.log(error);
            }
        } else {
            await updateDoc(doc(db, "chats", state.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text: text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                })
            });
        }

        await updateDoc(doc(db, "userchats", currentUser.uid), {
            [state.chatId + ".lastMessage"]: {
                text: text,
            },
            [state.chatId + ".date"]: serverTimestamp(),
        })

        await updateDoc(doc(db, "userchats", state.user.uid), {
            [state.chatId + ".lastMessage"]: {
                text: text,
            },
            [state.chatId + ".date"]: serverTimestamp(),
        })

        setText("");
        setImage(null);
    }

    return (
        <div className="flex items-center justify-between h-20 px-4 bg-white">
            <input className="w-full p-2 outline-none" type="text" placeholder="Type something..." onChange={(e) => setText(e.target.value)} value={text}/>
            <div className="flex items-center gap-4">
                <FaPaperclip size={20} color="black" className="ml-4 hover:cursor-pointer"/>
                <input className="hidden" type="file" id="file" onChange={(e) => setImage(e.target.files[0])}/>
                <label htmlFor="file"> 
                    <MdAddPhotoAlternate size={30} color="black" className="hover:cursor-pointer"/>
                </label>
                <button className=" text-sm px-4 py-2 text-white bg-[#8da4f1] rounded-md" onClick={handleSend}> Send </button>
            </div>
        </div>
    )
}

export default Input