import React from 'react'

type Props = {
    claimedSupply: number
    totalSupply: string
    loading: boolean
    address: string | undefined
    priceInEth: string | undefined
    mintNft: () => void
}

function MintButton({ claimedSupply, totalSupply, loading, address, priceInEth, mintNft }: Props) {
    return (
        <div className='flex justify-center w-full'>
            <button onClick={mintNft} disabled={loading || claimedSupply.toString() === totalSupply || !address} className='h-16 font-bold w-full bg-rose-600 mt-10 text-white rounded-full lg:w-[80%] disabled:bg-gray-400'>
                {loading ? (
                    <>Loading</>
                ) : claimedSupply.toString() === totalSupply ? (
                    <>Sold Out</>
                ) : !address ? (
                    <>Sign in to Mint</>
                ) : (
                    <><span className='font-bold'>Mint NFT ({priceInEth} ETH)</span></>
                )}
            </button>
        </div>
    )
}

export default MintButton