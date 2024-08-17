import React from 'react'
import SearchBar from '../components/SearchBar/SearchBar'
import PackageBox from '../components/PackageBox/PackageBox'

const PackagesPage = () => {
    return (
        <div className='px-[10px] flex flex-col min-h-screen bg-gradient-to-b from-orange-100 to-white'>
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
                        <PackageBox />
                        <PackageBox />
                        <PackageBox />
                        <PackageBox />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PackagesPage