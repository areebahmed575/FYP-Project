"use client"

const  LoginInputs = () => {
    return (
        <div className="inputs flex flex-col gap-[15px]">
            <input type="text" placeholder='Username' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
            <input type="text" placeholder='Email or Username' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
            <input type="password" placeholder='Password' className='w-[300px] py-[5px] px-[10px] rounded bg-white border-teal-500 border-[2px] outline-teal-700 placeholder:text-theme-black' />
            <p className='text-end text-theme-orange cursor-pointer mr-1'>Forgot Password</p>
        </div>
    )
}

export default LoginInputs