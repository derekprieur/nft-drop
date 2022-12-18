import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import React from 'react'

function Header() {
    // Auth
    const connectWithMetamask = useMetamask()
    const address = useAddress()
    const disconnect = useDisconnect()
    return (
        <header className='flex justify-between items-center'>
            <h1 className='w-52 cursor-pointer text-xl font-extralight sm:w-80'>The <span className='font-extrabold underline decoration-pink-400 underline-offset-2'>NetRunner</span> NFT Market Place</h1>
            <button onClick={() => address ? disconnect() : connectWithMetamask()} className='rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base'>{address ? 'Sign Out' : 'Sign In'}</button>
        </header>
    )
}

export default Header