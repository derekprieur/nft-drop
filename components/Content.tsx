import React from 'react'

function Content() {
    return (
        <div className='mt-10 flex flex-col flex-1 items-center space-y-6 text-center lg:justify-center lg:space-y-0'>
            <img className='w-80 object-cover pb-10 lg:h-40' src="https://www.artnews.com/wp-content/uploads/2021/09/Apes-Collage.jpg" alt="" />
            <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>The Baller Ape Coding Club | NFT Drop</h1>
            <p className='pt-2 text-xl text-green-500'>13 / 21 NFT's claimed</p>
        </div>
    )
}

export default Content