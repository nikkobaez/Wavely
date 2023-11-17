import React from 'react'
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
    return (
        <div className="flex w-screen h-screen justify-center items-center bg-[#A8BDFE]">
            <div className="flex w-3/5 overflow-hidden rounded-lg h-4/5">
                <Sidebar />
                <Chat />
            </div>
        </div>
    )
}

export default Home