import Image from "next/image"
import { FaStar, FaRegHeart } from "react-icons/fa";

const TrendingBox = () => {
    return (
        <div className="box h-[400px] w-[300px] shadow-md rounded-lg cursor-pointer mb-[40px] bg-white">
            <div className="image relative w-[100%] h-[70%] rounded-lg">
                <div className="absolute z-10 top-2 left-2">
                    <FaRegHeart />
                </div>
                <Image src="/hunzaValley2.jpg" fill className="object-cover rounded-lg" />
            </div>
            <div className="text py-[15px] px-[10px]">
                <div className="flex items-center justify-between">
                    <p className="font-semibold text-[1rem]">Hunza Valley</p>
                    <p className="flex items-center gap-1"><FaStar size={15} /> 4.4</p>
                </div>
                <div>
                    <p className="text-[14px] text-gray-500 ">Reviews - 4000</p>
                </div>
                <div className="flex items-center justify-end pt-[15px] gap-2">
                    <span className="text-[14px] text-gray-500">starting from</span> <span className="font-bold"> PKR <span>15,000</span></span>
                </div>
            </div>
        </div>
    )
}

export default TrendingBox