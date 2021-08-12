import { SearchIcon, LogoutIcon, UserIcon } from '@heroicons/react/solid';
import { signOut } from 'next-auth/client';
import { useSession } from "next-auth/client";
import { useState } from 'react';


function Header() {
    const [session] = useSession();
    const [input, setInput] = useState('');

    return (
        <header className='flex items-center py-3 justify-between bg-gray-100 sticky z-50'>
            <p className='pl-4 text-2xl font-semibold pr-11 text-gray-700'>Todo List</p>

            <div className='hidden md:flex flex-grow items-center border border-gray-200 rounded-lg shadow-sm px-5 py-2 hover:shadow-md'>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='flex-grow outline-none' placeholder='Search My Todos...' />
                <SearchIcon className='h-7 w-7 p-1 rounded-full bg-green-500 text-gray-700 cursor-pointer hover:animate-bounce' />
            </div>

            <div className='flex items-center justify-between border-gray-400 rounded-sm text-gray-700'>
                
                <div className='flex items-center justify-center flex-col mx-5'>
                    <UserIcon className='h-5 w-5 cursor-pointer' />
                    <p className='text-xs text-gray-500'>{session?.user?.username}</p>
                </div>
                <div onClick={signOut} className='flex flex-col items-center justify-center'>
                    <LogoutIcon className='h-5 w-5 rounded-full mr-5 cursor-pointer hover:scale-125 transform duration-75 ease-out' />
                    <p className='text-xs text-gray-500 pr-5'>Logout</p>
                </div>
                
            </div>
            
        </header>
    )
}

export default Header

