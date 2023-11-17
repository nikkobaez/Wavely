import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    const handleSearch = async () => {
        // query to get a document from the users collection
        const q = query(collection(db, "users"), where("displayName", "==", username));

        try {
            // gets the document from the users collection 
            const querySnapshot = await getDocs(q);

            // sets the document we get back to the user variable
             querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (error) {
            setError(true);
            console.log(error)
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async (user) => {
        // create a unique id by combining the current user's id with the selected user's id
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            // get a document from the chats collection 
            const res = await getDoc(doc(db, "chats", combinedId));

            // if document does not exist create a new document
            if (!res.exists()) {
                await setDoc(doc(db, "chats", combinedId), { messages: [] });
            }

            // create the user chats for the current user
            await updateDoc(doc(db, "userchats", currentUser.uid), {
                [combinedId + ".userinfo"]: {
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                },
                [combinedId + ".date"]: serverTimestamp(),
            });

            // create the user chat for the selected user
            await updateDoc(doc(db, "userchats", user.uid), {
                [combinedId + ".userinfo"]: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL
                },
                [combinedId + ".date"]: serverTimestamp(),
            });
        } catch (error) {
            setError(true);
            console.log(error)
        }
        dispatch({type: "CHANGE_USER", payload: user})
        setUser(null);
        setUsername("");
    }

    return (
        <div className="border-b border-gray-500">
            <div className="my-2">
                <input className="w-full px-4 py-2 text-sm text-white bg-transparent outline-none placeholder:text-gray-500" type="text" placeholder="Find a user" onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKey} value={username}/>
            </div>
            {error && <span> Something went wrong </span> }
            {user && 
                (
                    <div className="flex items-center gap-4 px-4 py-4 text-white hover:bg-[#2f2d52] hover:cursor-pointer" onClick={() => handleSelect(user)} >
                        <img className="bg-[#ddddf7] w-10 h-10 rounded-full object-cover" src={user.photoURL} alt="avatar" />
                        <div>
                            <span> {user.displayName} </span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Search