import Image from 'next/image'
import React from 'react'

const UniquePropertyBox = ({property}) => {
    return (
        <div key={property} className="relative rounded-xl overflow-hidden group">
            <Image
                src={`/hunzaValley.jpg`}
                alt={property}
                width={600}
                height={400}
                className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-3xl font-bold mb-2">{property}</h3>
                <p className="text-white text-lg">Experience a one-of-a-kind stay</p>
                <button className="mt-4 bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-300">
                    View Details
                </button>
            </div>
        </div>
    )
}

export default UniquePropertyBox