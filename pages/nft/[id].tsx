import { useAddress, useNFTDrop } from '@thirdweb-dev/react'
import { GetServerSideProps } from 'next/types'
import React, { useEffect, useState } from 'react'
import Content from '../../components/Content'
import Header from '../../components/Header'
import MintButton from '../../components/MintButton'
import { sanityClient, urlFor } from '../../sanity'
import { Collection } from '../../typings'
import { BigNumber } from 'ethers'
import toast, { Toaster } from 'react-hot-toast'

type Props = {
    collection: Collection
}

function NFTDropPage({ collection }: Props) {
    const [claimedSupply, setClaimedSupply] = useState<number>(0)
    const [totalSupply, setTotalSupply] = useState<string>('')
    const [priceInEth, setPriceInEth] = useState<string>()
    const [loading, setLoading] = useState(true)
    const nftDrop = useNFTDrop(collection.address)

    const address = useAddress()

    useEffect(() => {
        if (!nftDrop) return
        const fetchPrice = async () => {
            const claimConditions = await nftDrop.claimConditions.getAll()
            setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)
        }
        fetchPrice()
    }, [nftDrop])


    useEffect(() => {
        if (!nftDrop) return

        const fetchNFTDropData = async () => {
            setLoading(true)
            const claimed = await nftDrop.getAllClaimed()
            const total = await nftDrop.totalSupply()

            setTotalSupply(total.toString())
            setClaimedSupply(claimed.length)

            setLoading(false)
        }
        fetchNFTDropData()
    }, [nftDrop])

    const mintNft = () => {
        if (!nftDrop || !address) return
        const quantity = 1 // how many unique NFTs to mint

        setLoading(true)
        const notification = toast.loading('Minting NFT...', {
            style: {
                background: 'white',
                color: 'green',
                fontWeight: 'bolder',
                fontSize: '17px',
                padding: '20px'
            }
        })

        nftDrop.claimTo(address, quantity).then(async (tx) => {
            const receipt = tx[0].receipt
            const claimedTokenId = tx[0].id
            const claimedNFT = await tx[0].data()

            toast('NFT Minted!', {
                duration: 8000,
                style: {
                    background: 'green',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px'
                }
            })

            console.log('receipt', receipt)
            console.log('claimedTokenId', claimedTokenId)
            console.log('claimedNFT', claimedNFT)

        }).catch(err => {
            console.log(err)
            toast('Error minting NFT', {
                style: {
                    background: 'red',
                    color: 'white',
                    fontWeight: 'bolder',
                    fontSize: '17px',
                    padding: '20px'
                }
            })

        }).finally(() => {
            setLoading(false)
            toast.dismiss(notification)
        })
    }

    return (
        <div className='flex h-screen flex-col lg:grid lg:grid-cols-10'>
            <Toaster position='bottom-center' />
            {/* left */}
            <div className='bg-gradient-to-br from-cyan-800 to-rose-500 lg:col-span-4'>
                <div className='flex flex-col items-center justify-center py-2 lg:min-h-screen'>
                    <div className='bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl'>
                        <img className='w-44 rounded-xl object-cover lg:h-96 lg:w-72' src={urlFor(collection.previewImage).url()} alt="" />
                    </div>
                    <div className='text-center p-5 space-y-2'>
                        <h1 className='text-4xl font-bold text-white'>{collection.nftCollectionName}</h1>
                        <h2 className='text-xl text-gray-300'>{collection.description}</h2>
                    </div>
                </div>
            </div>
            {/* right */}
            <div className='flex flex-1 flex-col p-12 lg:col-span-6'>
                {/* Header */}
                <Header signIn />
                <hr className='my-2 border' />
                {address && (
                    <p className='text-center text-sm lg:text-base text-rose-400'>You're logged in with wallet {address.slice(0, 5)}...{address.slice(address.length - 5)}</p>
                )}
                {/* Content */}
                <Content title={collection.title} image={urlFor(collection.mainImage).url()} claimedSupply={claimedSupply} totalSupply={totalSupply} loading={loading} />
                {/* Mint Button */}
                <MintButton claimedSupply={claimedSupply} totalSupply={totalSupply} loading={loading} address={address} priceInEth={priceInEth} mintNft={mintNft} />
            </div>
        </div>
    )
}

export default NFTDropPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = `
    *[_type == 'collection' && slug.current == $id][0]{
        _id,
        title,
        address, 
        description,
        nftCollectionName,
        mainImage {
            asset
        },
        previewImage {
            asset
        },
        slug {
            current
        },
        creator-> {
            _id,
            name,
            address,
            slug {
                current
            },
        },
    }
    `
    const collection = await sanityClient.fetch(query, { id: params?.id })

    if (!collection) return { notFound: true }

    return {
        props: {
            collection
        }
    }
}