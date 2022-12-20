import React from 'react'

type Props = {
    title: string
    image: string
    claimedSupply?: number
    totalSupply?: string
    loading?: boolean
}

function Content({ title, image, claimedSupply, totalSupply, loading }: Props) {
    return (
        <div className='mt-10 flex flex-col flex-1 items-center space-y-6 text-center lg:justify-center lg:space-y-0'>
            <img className='w-80 object-cover pb-10 lg:h-40' src={image} alt="" />
            <h1 className='text-3xl font-bold lg:text-5xl lg:font-extrabold'>{title}</h1>
            {(loading && totalSupply === '') ? (
                <>
                    <p className='pt-2 text-xl text-green-500 animate-pulse'> Loading supply count... </p>
                    <img className='h-80 w-80 object-contain' src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt="" />
                </>
            ) : (
                <p className='pt-2 text-xl text-green-500'>{claimedSupply} / {totalSupply}  NFT's claimed</p>
            )}
        </div>
    )
}

export default Content