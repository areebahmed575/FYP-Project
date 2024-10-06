'use client'
import React, { useState } from 'react'

const DatesAndGuest = () => {
    const [checkInDate, setCheckInDate] = useState('')
    const [checkOutDate, setCheckOutDate] = useState('')
    const [guests, setGuests] = useState(2)
    const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false)

    return (
        <div>
            {/*    DATES INPUT  */}
            <div className="flex mb-4">
                <div className="w-1/2 pr-1">
                    <h3 className="font-semibold text-gray-700 text-xs uppercase">CHECK-IN</h3>
                    <input
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full border rounded-tl-lg rounded-bl-lg p-2 mt-1 text-sm"
                    />
                </div>
                <div className="w-1/2 pl-1">
                    <h3 className="font-semibold text-gray-700 text-xs uppercase">CHECKOUT</h3>
                    <input
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="w-full border rounded-tr-lg rounded-br-lg p-2 mt-1 text-sm"
                    />
                </div>
            </div>

            {/* GUEST INPUT */}

            <div className="mb-4 relative">
                <h3 className="font-semibold text-gray-700 text-xs uppercase mb-1">GUESTS</h3>
                <button
                    onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
                    className="w-full text-left border rounded-lg p-2 flex justify-between items-center text-sm"
                >
                    <span>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
                    {/* <span className="text-gray-400">▼</span> */}
                </button>
                {isGuestDropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
                        {[1, 2, 3, 4].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleGuestChange(num)}
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            >
                                {num} {num === 1 ? 'guest' : 'guests'}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DatesAndGuest