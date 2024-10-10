import React from 'react'

const LoadingComp = () => {
    return (
        <div className='container mx-auto p-4 pt-14 flex items-center justify-center h-[90vh]'>
            <div
                class="p-3 animate-spin bg-gradient-to-r from-teal-500 to-blue-500 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
            >
                <div
                    class="rounded-full h-full w-full bg-white/80 dark:bg-white background-blur-md"
                ></div>
            </div>
        </div>
    )
}

export default LoadingComp