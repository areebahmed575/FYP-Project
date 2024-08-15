import Image from "next/image"
import { FaStar, FaRegHeart } from "react-icons/fa";

const CityBox = ({city}) => {
    return (
        <div key={city} className="relative rounded-lg overflow-hidden group">
            <Image
                src={`/hunzaValley.jpg`}
                alt={city}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-xl font-bold">{city}</p>
            </div>
        </div>
    )
}

export default CityBox