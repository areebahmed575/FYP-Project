import { createContext, useReducer } from 'react'

function getDayAfterTomorrow() {
    // Create a new Date object for the current date
    const today = new Date();
    // console.log(today)

    // Add 2 days to the current date
    today.setDate(today.getDate() + 2);

    return today.toDateString();
}

function getEndDate() {
    // Create a new Date object for the current date
    const today = new Date();
    // console.log(today)

    // Add 3 days to the current date
    today.setDate(today.getDate() + 3);

    return today.toDateString();
}

const dayAfterTomorrow = getDayAfterTomorrow();
const endDate = getEndDate();

const INITIAL_STATE = {
    destination: undefined,
    dates: [{
        startDate: dayAfterTomorrow,
        endDate: endDate,
    }],
    options: {
        adult: 1,
        children: undefined,
        room: 1
    }
};

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH":
            return INITIAL_STATE
        default:
            return state
    }
}

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);
    return (
        <SearchContext.Provider value={{
            destination: state.destination,
            dates: state.dates,
            options: state.options,
            dispatch,
        }}>
            {children}
        </SearchContext.Provider>
    )
}