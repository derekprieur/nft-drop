import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react'
import Link from 'next/link'
import React from 'react'

type Props = {
    titleSize?: string
    signIn?: boolean
}

function Header({ titleSize, signIn }: Props) {
    // Auth
    const connectWithMetamask = useMetamask()
    const address = useAddress()
    const disconnect = useDisconnect()
    return (
        <header className='flex justify-between items-center'>
            <Link href='/'>
                <h1 className={`${signIn && 'w-52 sm:w-80'} cursor-pointer ${titleSize || 'text-xl'} font-extralight ${!signIn && 'mb-4'}`}>The <span className='font-extrabold underline decoration-pink-400 underline-offset-2'>NetRunner</span> NFT Market Place</h1>
            </Link>
            {signIn && <button onClick={() => address ? disconnect() : connectWithMetamask()} className='rounded-full bg-rose-400 text-white px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base'>{address ? 'Sign Out' : 'Sign In'}</button>}
        </header>
    )
}

export default Header