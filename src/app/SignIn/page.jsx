"use client"
import { motion } from 'framer-motion';

const Register = () => {
    return (
        <div className="min-h-screen px-[50px] py-[25px]">
            <div className="mx-auto px-4 py-12">
                <div className="left flex-1 flex flex-col items-center justify-center gap-[35px] ">
                    <div className="text">
                        <h1 className='text-center text-[32px] font-semibold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text'>Welcome To PakiGenTravel!</h1>
                        <p className='text-center text-[14px]'>Sign In or Create Your Account</p>
                    </div>
                    <motion.div className="sso" whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}>
                        <button className='bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-2' >

                            Login With Google
                        </button>
                    </motion.div>
                    <div className="seprator w-[100%] flex items-center justify-center gap-[20px]">
                        <div className='bg-theme-orange h-[3px] w-[33%]'></div>
                        <p className='text-[18px] font-semibold'>Or</p>
                        <div className='bg-theme-orange h-[3px] w-[33%]'></div>
                    </div>
                    <div className="inputs flex flex-col gap-[15px]">
                        <input type="text" placeholder='Username' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                        <input type="text" placeholder='Email or Username' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                        <input type="password" placeholder='Password' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                        <p className='text-end text-theme-orange cursor-pointer mr-1'>Forgot Password</p>
                    </div>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-2">
                        <span>Sign In</span>
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

export default Register