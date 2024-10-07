'use client'
import { createSlice } from '@reduxjs/toolkit'
import { useEffect } from 'react';

let today = new Date().toLocaleDateString('en-CA')
let dayAfterTomorrow;
let endDate;

// console.log(today)

function getDayAfterTomorrow() {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    // console.log(today)
    return (today.toLocaleDateString('en-CA'));
}

function getEndDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    // console.log(today)
    return today.toLocaleDateString('en-CA');
}

// useEffect(() => {
//     dayAfterTomorrow = getDayAfterTomorrow();
//     endDate = getEndDate();
// }, [today])

const initialState = {
    destination: "",
    dates: {
        startDate: getDayAfterTomorrow(),
        endDate: getEndDate(),
        key: "selection"
    },
    options: {
        adult: 1,
        children: 0,
        room: 1
    }
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        getSearch: (state, { payload }) => {
            console.log(payload.dates)
            state.destination = payload.destination
            state.dates = payload.dates
            state.options = payload.options
        },
    },
})

const { actions, reducer } = searchSlice
// Action creators are generated for each case reducer function
export const { getSearch } = actions

export default reducer