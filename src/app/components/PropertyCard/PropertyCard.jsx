'use client'

import Image from "next/image";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useAppSelector } from "../../../lib/store/hooks";

const PropertyCard = ({ data }) => {
    const { dates, options } = useAppSelector(state => state.search)
    // console.log(dates)
    const { startDate, endDate } = dates
    const { property, accessibilityLabel, hotel_id } = data;
    const subtitleArray = accessibilityLabel.split("\n").slice(0, 4).join(" ");
    const { photoUrls, reviewScore, name, priceBreakdown } = property;
    const { grossPrice } = priceBreakdown
    const usdCurrency = 278.64;
    const priceInPKR = Math.round(usdCurrency * grossPrice.value).toLocaleString('en-US')

    return (
        <Link href={`/SinglePropertyListing/${hotel_id}?arrival_date=${startDate}&departure_date=${endDate}`} className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer flex flex-col">
            <div className="relative flex-1 aspect-square">
                <Image src={photoUrls[0]} alt={name} fill className="object-cover aspect-square" />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md">
                    <CiHeart className="w-6 h-6 text-gray-600" />
                </button>
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <span className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                        <FaStar className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs font-medium">New</span>
                    </span>
                </div>
                <p className="text-sm text-gray-600">{subtitleArray}</p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold">PKR {priceInPKR}</span>
                    <span className="text-lg font-bold flex items-center gap-2"><FaStar className="w-3 h-3 text-yellow-400 mr-1" /> {reviewScore}</span>
                </div>
            </div>
        </Link>
    )
};

export default PropertyCard