'use client'
import Image from "next/image";

const RentalCard = ({ rental, isUnique = false }) => {
    // console.log(rental)
    const { hotel_id, property } = rental
    // console.log(property)
    const { name, photoUrls, reviewCount, wishlistName, reviewScore, reviewScoreWord, priceBreakdown } = property
    // console.log(priceBreakdown.grossPrice.value.toFixed(2))
    const usdCurrency = 278.64;
    const priceInPKR = Math.round(usdCurrency * priceBreakdown.grossPrice.value.toFixed(2)).toLocaleString('en-US')
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
                <Image src={photoUrls[0]} alt={name} width={300} height={200} className="w-full h-48 object-cover" unoptimized />
                <button className="absolute top-2 right-2 text-white bg-opacity-50 bg-gray-700 rounded-full p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm text-gray-600">{wishlistName}</p>
                <div className="flex items-center mt-2">
                    <span className="bg-teal-500 text-white px-1 rounded text-sm mr-2">{reviewScore}</span>
                    <span className="text-sm text-gray-600">{isUnique ? 'Superb' : 'Fabulous'} · {reviewCount} reviews</span>
                </div>
                {!isUnique && (
                    <p className="mt-2 font-semibold">
                        Starting from PKR {priceInPKR}
                    </p>
                )}
            </div>
        </div>
    )
};

export default RentalCard