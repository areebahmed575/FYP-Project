'use client'
import { useRef } from 'react'
import { Provider } from "react-redux"
import { createStore } from "../../lib/store/store"
import { getSearch } from '../../lib/store/Slices/searchSlice'

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

const StoreProvider = ({ children }) => {

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
    
    const storeRef = useRef()
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = createStore()
        storeRef.current.dispatch(getSearch(initialState))
    }
    return (
        <Provider store={storeRef.current}>
            {children}
        </Provider>
    )
}

export default StoreProvider