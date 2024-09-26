"use client"
import { motion } from 'framer-motion';
// import { register, login } from '../utils/action';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RegisterForm from '../components/RegisterForm/RegisterForm'

const Register = () => {

    const { data, status } = useSession();
    // console.log(data, "===>>>> data")
    // console.log(status, "===>>>> status")

    const router = useRouter()

    if (status === "loading") {
        return <div className='loading'>Loading...</div>
    }

    if (status === 'authenticated') {
        router.push("/")
    }

    return (
        <div className="min-h-screen px-[50px] py-[25px]">
            <div className="mx-auto px-4 py-12">
                <div className="left flex-1 flex flex-col items-center justify-center gap-[35px] ">
                    <div className="text">
                        <h1 className='text-center text-[32px] font-semibold bg-gradient-to-r from-teal-500 to-blue-500 text-transparent bg-clip-text'>Welcome To PakiGenTravel!</h1>
                        <p className='text-center text-[14px]'>Sign In or Create Your Account</p>
                    </div>
                    <motion.div className="sso" whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} onClick={() => signIn("google")}>
                        <button className='bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center space-x-2'>
                            Login With Google
                        </button>
                    </motion.div>
                    <div className="seprator w-[100%] flex items-center justify-center gap-[20px]">
                        <div className='bg-theme-orange h-[3px] w-[33%]'></div>
                        <p className='text-[18px] font-semibold'>Or</p>
                        <div className='bg-theme-orange h-[3px] w-[33%]'></div>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    )
}

export default Register