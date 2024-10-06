import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './Slices/searchSlice'


export const createStore = () => {
    return configureStore({
        reducer: {
            search: searchReducer
        },
    })
}

