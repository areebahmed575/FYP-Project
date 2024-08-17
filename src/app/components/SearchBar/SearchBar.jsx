"use client";
import React, { useState } from 'react'
import { DateRange } from 'react-date-range';
import { FaSearch } from "react-icons/fa";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file 
import { format } from "date-fns";
import OptionBox from './OptionBox';


const SearchBar = () => {
    const [showDate, setShowDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [showOpitons, setShowOptions] = useState(false)
    const [options, setOptions] = useState({
        adults: 1,
        childern: 0,
        room: 1,
    })

    function optionHandler(name, opertation) {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: opertation === 'inc' ? options[name] + 1 : options[name] - 1
            }
        })
    }
    return (
        <>
            <div className="searchMainBox w-[100%] bg-white drop-shadow-lg my-4 rounded">
                <div className="wrapper flex items-center justify-between gap-4 pe-4">
                    <div className="left flex-1 py-4 px-3 hover:bg-slate-200 rounded">
                        <p className='text-[12px] font-semibold'>Where</p>
                        <input type="text" placeholder='Search destinations' className='outline-none text-[13px] bg-transparent' />
                    </div>
                    <div className="mid flex flex-1 py-4 px-3 hover:bg-slate-200 rounded" onClick={() => setShowDate(!showDate)}>
                        <div className="checkin relative" >
                            <p className='text-[12px] font-semibold'>Check-in date - Check-out date</p>
                            <p className='text-[14px] text-gray-400'>{`${format(dates[0]?.startDate, "dd/MM/yyyy")} to ${format(dates[0]?.endDate, "dd/MM/yyyy")}`}</p>
                            {
                                showDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setDates([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={dates}
                                    className="dateRange absolute left-[-11px]"
                                    minDate={new Date()}
                                />
                            }
                        </div>
                    </div>
                    <div className="right flex-1 py-4 px-3 hover:bg-slate-200 rounded relative" onClick={() => setShowOptions(!showOpitons)}>
                        <p className='text-[12px] font-semibold'>Who</p>
                        <p className='text-[14px] text-gray-400'>Add guests</p>
                        {

                            showOpitons && <OptionBox optionHandler={optionHandler} opitons={options} />

                        }
                    </div>
                    <div className="icon bg-teal-500 p-4 rounded-full text-white cursor-pointer hover:bg-teal-600">
                        <FaSearch />
                    </div>
                </div>
            </div>
        </>

    )
}

export default SearchBar