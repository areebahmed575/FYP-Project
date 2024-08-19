import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// bg - gradient - to - b from - [#00000077] to - transparent w - [100 %] h - [100 %]
const PackageBox = () => {
    return (
        <div className=' w-[300px] h-[450px] mb-[10px]'>
            <div className='relative w-[100%] h-[100%]'>
                <Image src={`/hunzaValley.jpg`} fill className='object-cover' />
                <div className='absolute top-0 w-[100%] h-[100%] px-[20px] py-[40px]'>
                    <div className='flex flex-col items-center w-[100%] h-[100%]'>
                        <div className='text-center flex-[5]'>
                            <h1 className='text-[26px] font-extrabold tracking-widest'>Hunza Valley</h1>
                            <hr className='w-[40%] h-[2px] bg-black mx-auto my-[10px]' />
                            <p className='font-semibold tracking-widest'>Starting from</p>
                            <p className='text-[20px]'>PKR <span>16,000</span></p>
                        </div>
                        <Link href={"/Packages"} className='flex-[1] '>
                            <p className='bg-teal-500 px-[15px] py-[8px] rounded-full text-white hover:bg-teal-600 transition duration-150'>
                                Explore
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageBox