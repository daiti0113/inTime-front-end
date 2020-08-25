import React, {createContext, useReducer} from "react"

const initialState = {
    user: {
        loggedIn: false,
        name: "",
        email: "",
        uid: ""
    },
    error: {
        errorCode: "",
        errorMessage: ""
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
                return {...state, ...{user: action.payload}}
            case "LOGIN_FAILURE":
            case "SIGNUP_FAILURE":
                return {...state, ...{error: action.payload}}
            default:
                return {...state}
        }
    }, initialState)
    console.log(state)
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {userStore, UserProvider}