import React from 'react'

function Header() {
    return (
        <header className='flex justify-between items-center'>
            <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>The <span className='font-extrabold underline decoration-pink-400 underline-offset-2'>NetRunner</span> NFT Market Place</h1>
            <button className='rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base'>Sign In</button>
        </header>
    )
}

export default Header