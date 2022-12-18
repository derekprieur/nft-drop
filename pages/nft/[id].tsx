import React from 'react'
import Content from '../../components/Content'
import Header from '../../components/Header'
import MintButton from '../../components/MintButton'

function NFTDropPage() {
    return (
        <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
            {/* left */}
            <div className='bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4'>
                <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
                    <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                        <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72' src="https://www.businessinsider.in/photo/87162740/most-expensive-bored-ape-nft-sells-for-2-7-million.jpg?imgsize=36280" alt="" />
                    </div>
                    <div className='text-center p-5 space-y-2'>
                        <h1 className='text-4xl font-bold text-white'>Baller Apes</h1>
                        <h2 className='text-xl text-gray-300'>A collection of Baller Apes who live & breathe React!</h2>
                    </div>
                </div>
            </div>
            {/* right */}
            <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
                {/* Header */}
                <Header />
                <hr className='my-2 border' />
                {/* Content */}
                <Content />
                {/* Mint Button */}
                <MintButton />
            </div>
        </div>
    )
}

export default NFTDropPage