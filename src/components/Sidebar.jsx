import React from 'react'
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
    return (
        <div className='flex-[1] border-r-2 border-[#3e3c61] bg-[#3e3c61]'>
            <Navbar />
            <Search />
            <Chats />
        </div>
  )
}

export default Sidebar