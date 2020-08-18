import React, {createContext, useReducer} from "react"
import {formatDate} from "../helper/convertDate"

const initialState = {
    // Set today's date to midnight
    displayStartDate: new Date(formatDate(new Date())),
    displayPeriod: 30
}

// Define Store
const displaySettingStore = createContext(initialState)

// Defin Provider
const {Provider} = displaySettingStore
const DisplaySettingProvider = ({children}) => {
    // Define Reducer
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "UPDATE_DISPLAY_START_DATE":
                return {...state, displayStartDate: action.payload}
            case "UPDATE_DISPLAY_PERIOD":
                return {...state, displayPeriod: action.payload - 0}
            default:
                return {...state}
        }
    }, initialState)
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {displaySettingStore, DisplaySettingProvider}