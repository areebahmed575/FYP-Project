'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUser, FaChild, FaBed } from 'react-icons/fa'

const OptionBox = ({ optionHandler, options }) => {
  const optionConfig = [
    { name: 'adults', icon: FaUser, label: 'Adults', min: 1 },
    { name: 'children', icon: FaChild, label: 'Children', min: 0 },
    { name: 'rooms', icon: FaBed, label: 'Rooms', min: 1 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute left-0 sm:left-auto right-0 sm:right-auto top-full mt-2 w-72 max-w-[95vw] py-4 px-6 rounded-lg shadow-xl bg-white z-10"
    >
      {optionConfig.map(({ name, icon: Icon, label, min }) => (
        <div key={name} className="option flex justify-between items-center my-4">
          <div className="flex items-center space-x-2">
            <Icon className="text-teal-500" />
            <span className="optionText text-gray-700 font-medium">{label}</span>
          </div>
          <div className="optionCounter flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={options[name] <= min}
              className="optionCounterMinus w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => optionHandler(name, "dec")}
              aria-label={`Decrease ${label}`}
            >
              -
            </motion.button>
            <AnimatePresence mode="wait">
              <motion.span
                key={options[name]}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="optionCounterNumber font-bold text-base sm:text-lg"
              >
                {options[name]}
              </motion.span>
            </AnimatePresence>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="optionCounterPlus w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-teal-500 text-white flex items-center justify-center"
              onClick={() => optionHandler(name, "inc")}
              aria-label={`Increase ${label}`}
            >
              +
            </motion.button>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default OptionBox