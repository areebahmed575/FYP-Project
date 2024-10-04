import { createContext, useReducer, useEffect } from 'react';

function getDayAfterTomorrow() {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
}

function getEndDate() {
    const today = new Date();
    today.setDate(today.getDate() + 3);
    return today;
}

const dayAfterTomorrow = getDayAfterTomorrow();
const endDate = getEndDate();

const INITIAL_STATE = {
    destination: "",
    dates: [{
        startDate: dayAfterTomorrow,
        endDate: endDate,
    }],
    options: {
        adult: 1,
        children: 0,
        room: 1
    }
};

// Helper function to get initial state from localStorage or use default
const getInitialState = () => {
    const savedState = localStorage.getItem('INITIAL_STATE');
    return savedState ? JSON.parse(savedState) : INITIAL_STATE;
}

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export const SearchContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SearchReducer, getInitialState());

    // Sync state to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('INITIAL_STATE', JSON.stringify(state));
    }, [state]);

    return (
        <SearchContext.Provider value={{
            destination: state.destination,
            dates: state.dates,
            options: state.options,
            dispatch,
        }}>
            {children}
        </SearchContext.Provider>
    );
};
