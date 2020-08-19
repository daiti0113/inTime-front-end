import React, {createContext, useReducer} from "react"

const initialState = {
    user: {
        name: "",
        loggedIn: false
    }
}

// Define Store
const userStore = createContext(initialState)

// Defin Provider
const {Provider} = userStore
const UserProvider = ({children}) => {
    // Define Reducer
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "LOGIN_SUCCESS":
                return {...state}
            case "LOGIN_FAILURE":
                return {...state}
            default:
                return {...state}
        }
    }, initialState)
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {userStore, UserProvider}