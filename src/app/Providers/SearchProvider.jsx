"use client"
import { SearchContext } from "../context/searchContext"
import React, { useContext } from 'react'


const SearchProvider = ({ children }) => {
    const { dates, destination, options } = useContext(SearchContext);
    return (
        <div>
            {children}
        </div>
    )
}

export default SearchProvider