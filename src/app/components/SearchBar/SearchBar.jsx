'use client'
import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DateRange } from 'react-date-range'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns"
import OptionBox from './OptionBox'
import { useAppDispatch } from '../../../lib/store/hooks'
import { getSearch } from '../../../lib/store/Slices/searchSlice'
import { useRouter } from 'next/navigation'

const SearchBar = ({ isCompact = false }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  function getDayAfterTomorrow() {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toLocaleDateString('en-CA');
  }

  function getEndDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today.toLocaleDateString('en-CA');
  }

  const dayAfterTomorrow = getDayAfterTomorrow();
  const endDate = getEndDate();

  const [showDate, setShowDate] = useState(false)
  const [dates, setDates] = useState([
    {
      startDate: dayAfterTomorrow,
      endDate: endDate,
      key: 'selection'
    }
  ])

  const [showOptions, setShowOptions] = useState(false)
  const [options, setOptions] = useState({
    adults: 1,
    children: 0,
    rooms: 1,
  })
  const [destination, setDestination] = useState('')

  function optionHandler(name, operation) {
    setOptions((prev) => ({
      ...prev,
      [name]: operation === 'inc' ? prev[name] + 1 : Math.max(0, prev[name] - 1)
    }))
  }

  const compactClass = isCompact ? 'p-2' : 'p-2 my-4 sm:my-8';
  const inputClass = isCompact ? 'text-xs sm:text-xs' : 'text-xs sm:text-sm';
  const itemClass = isCompact ? 'flex-shrink-0' : 'flex-1';
  
  // Close date and options pickers when clicking outside
  const handleWindowClick = (e) => {
    if (!e.target.closest('.date-picker-trigger') && !e.target.closest('.date-picker-container')) {
      setShowDate(false);
    }
    if (!e.target.closest('.options-trigger') && !e.target.closest('.options-container')) {
      setShowOptions(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    return () => window.removeEventListener('click', handleWindowClick);
  }, []);

  function searchHandler() {
    const payload = {
      destination,
      dates: dates[0],
      options
    }
    if (payload.destination === '') {
      return alert("No Destination Selected")
    } else {
      dispatch(getSearch(payload))
      router.push(`/PropertyListing/${payload.destination}?arrival_date=${payload.dates.startDate}&departure_date=${payload.dates.endDate}`)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-xs sm:max-w-sm md:max-w-4xl mx-auto bg-white rounded-full shadow-lg overflow-visible ${compactClass}`}
    >
      <div className="flex items-center justify-between space-x-1 sm:space-x-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${itemClass} flex items-center space-x-1 sm:space-x-2 p-2 rounded-full hover:bg-gray-100`}
        >
          <FaMapMarkerAlt className="text-teal-500 text-sm sm:text-base" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={`w-full outline-none bg-transparent ${inputClass}`}
            aria-label="Destination input"
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${itemClass} hidden sm:flex items-center space-x-1 sm:space-x-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer date-picker-trigger`}
          onClick={(e) => {
            e.stopPropagation();
            setShowDate(!showDate);
            setShowOptions(false);
          }}
        >
          <FaCalendarAlt className="text-teal-500 text-sm sm:text-base" />
          <span className={inputClass}>
            {`${format(new Date(dates[0].startDate), "MMM dd")} - ${format(new Date(dates[0].endDate), "MMM dd")}`}
          </span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${itemClass} hidden sm:flex items-center space-x-1 sm:space-x-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer options-trigger relative`}
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(!showOptions);
            setShowDate(false);
          }}
        >
          <FaUsers className="text-teal-500 text-sm sm:text-base" />
          <span className={inputClass}>
            {`${options.adults + options.children} guests, ${options.rooms} rooms`}
          </span>
          <AnimatePresence>
            {showOptions && (
              <div className="options-container">
                <OptionBox optionHandler={optionHandler} options={options} />
              </div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-500 text-white p-2 sm:p-3 md:p-4 rounded-full hover:bg-teal-600 transition-colors duration-300"
          aria-label="Search"
          onClick={searchHandler}
        >
          <FaSearch className="text-sm sm:text-base" />
        </motion.button>
      </div>
      <AnimatePresence>
        {showDate && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-10 date-picker-container"
          >
            <DateRange
              editableDateInputs={true}
              onChange={item => {
                const formattedSelection = {
                  ...item.selection,
                  startDate: item.selection.startDate instanceof Date
                    ? item.selection.startDate.toLocaleDateString('en-CA')
                    : new Date(item.selection.startDate).toLocaleDateString('en-CA'),
                  endDate: item.selection.endDate instanceof Date
                    ? item.selection.endDate.toLocaleDateString('en-CA')
                    : new Date(item.selection.endDate).toLocaleDateString('en-CA')
                };
                setDates([formattedSelection])
              }}
              moveRangeOnFirstSelection={false}
              ranges={dates.map(date => ({
                ...date,
                startDate: new Date(date.startDate),
                endDate: new Date(date.endDate)
              }))}
              className="shadow-lg rounded-lg overflow-hidden"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SearchBar