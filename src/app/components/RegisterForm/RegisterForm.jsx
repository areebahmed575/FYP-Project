"use client"
import { motion } from 'framer-motion';
import { register, login } from '../../utils/action';
import { useFormState } from 'react-dom'
import { useState } from 'react';

const RegisterForm = () => {
    const [loginForm, setLoginForm] = useState(false)
    const [registerState, registerAction] = useFormState(register, false)
    const [loginState, loginAction] = useFormState(login, false)
    // console.log(loginForm)

    return (
        <>
            {!loginForm ? (
                <form action={registerAction} className="inputs flex flex-col gap-[15px]">
                    <input required type="text" placeholder='Username' name='username' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                    <input required type="email" placeholder='Email' name='email' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                    <input required type="password" placeholder='Password' name='password' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                    <p className='text-end text-theme-orange cursor-pointer mr-1' onClick={() => setLoginForm(true)}>Already have a account</p>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} className=''>
                        <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center space-x-2">Sign Up</span>
                    </motion.button>
                    <p>{registerState?.message}</p>
                </form>) : (
                <form action={loginAction} className="inputs flex flex-col gap-[15px]">
                    <input required type="email" placeholder='Email' name='email' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                    <input required type="password" placeholder='Password' name='password' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
                    <p className='text-end text-theme-orange cursor-pointer mr-1' onClick={() => setLoginForm(!loginForm)}>Create an account</p>
                    <motion.button whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }} className=''>
                        <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center space-x-2">Sign In</span>
                    </motion.button>
                    <p>{loginState?.message}</p>
                </form>
            )
            }
        </>
    )
}

export default RegisterForm