import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PackageBox from '../components/PackageBox/PackageBox'
import Image from 'next/image'

const PackagesPage = () => {
    return (
        <div className='flex flex-col min-h-screen px-[50px] py-[25px]'>
            <main className='container mx-auto px-4 py-12'>
                <h1 className='text-5xl font-extrabold text-center mb-12 text-gray-800'>Find The Best Package</h1>
                <div className="bg-white rounded-xl shadow-xl p-8 mb-12 flex justify-center items-center">
                    <SearchBar />
                </div>
                <div className='mb-16'>
                    <div className="text mb-5">
                        <h1 className='text-4xl font-semibold mb-2 text-gray-800'>Your Wishlist starts here</h1>
                        <p className='text-gray-500'>Save destinations all in one place—even if you're not ready to book</p>
                    </div>
                    <div className='flex justify-between flex-wrap'>
                        {
                            [1, 2, 3, 4].map((item, index) => (
                                <PackageBox key={index}/>
                            ))
                        }   
                    </div>
                </div>
                <section className="mb-16">
                    <h2 className="text-4xl font-semibold mb-8 text-gray-800">Special Offers</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {['Summer Sale', 'Solo Package', 'Family Package'].map((offer) => (
                            <div key={offer} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                <Image
                                    src={`/hunzaValley2.jpg`}
                                    alt={offer}
                                    width={400}
                                    height={200}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-2xl font-semibold mb-2 text-gray-700">{offer}</h3>
                                    <p className="text-gray-600 mb-4">Limited time offer. Book now and save!</p>
                                    <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition duration-300">
                                        View Offer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default PackagesPage