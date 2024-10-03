'use client'

import React, { useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DateRange } from 'react-date-range'
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUsers } from "react-icons/fa"
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { format } from "date-fns"
import OptionBox from './OptionBox'
import { SearchContext } from '../../context/searchContext'

function getDayAfterTomorrow() {
  // Create a new Date object for the current date
  const today = new Date();
  // console.log(today)

  // Add 2 days to the current date
  today.setDate(today.getDate() + 2);

  return today;
}

function getEndDate() {
  // Create a new Date object for the current date
  const today = new Date();
  // console.log(today)

  // Add 3 days to the current date
  today.setDate(today.getDate() + 3);

  return today;
}

const SearchBar = ({ isCompact = false }) => {
  const { dispatch } = useContext(SearchContext)

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

  // console.log("destination", destination)
  // console.log("options", options)
  // console.log("dates", dates)

  const compactClass = isCompact ? 'py-2 px-4' : 'p-2 my-8';
  const inputClass = isCompact ? 'text-xs' : 'text-sm';
  const itemClass = isCompact ? 'flex-shrink-0' : 'flex-1';

  function searchHandler() {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-4xl mx-auto bg-white rounded-full shadow-lg overflow-visible ${compactClass}`}
    >
      <div className="flex items-center justify-between space-x-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${itemClass} flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100`}
        >
          <FaMapMarkerAlt className="text-teal-500" />
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
          className={`${itemClass} flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer`}
          onClick={() => setShowDate(!showDate)}
        >
          <FaCalendarAlt className="text-teal-500" />
          <span className={inputClass}>
            {`${format(dates[0].startDate, "MMM dd")} - ${format(dates[0].endDate, "MMM dd")}`}
          </span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className={`${itemClass} flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 cursor-pointer relative`}
          onClick={() => setShowOptions(!showOptions)}
        >
          <FaUsers className="text-teal-500" />
          <span className={inputClass}>
            {`${options.adults + options.children} guests, ${options.rooms} rooms`}
          </span>
          <AnimatePresence>
            {showOptions && (
              <OptionBox optionHandler={optionHandler} options={options} />
            )}
          </AnimatePresence>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-teal-500 text-white p-4 rounded-full hover:bg-teal-600 transition-colors duration-300"
          aria-label="Search"
          onClick={searchHandler}
        >
          <FaSearch />
        </motion.button>
      </div>
      <AnimatePresence>
        {showDate && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-1/2 transform -translate-x-1/2 mt-2 z-10"
          >
            <DateRange
              editableDateInputs={true}
              onChange={item => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="shadow-lg rounded-lg overflow-hidden"
              minDate={new Date()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default SearchBar