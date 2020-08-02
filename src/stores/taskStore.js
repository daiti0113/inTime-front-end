import React, {createContext, useReducer} from "react"

const initialState = {tasks: []}

// Define Store
const store = createContext(initialState)

// Defin Provider
const {Provider} = store
const TaskProvider = ({children}) => {
    // Define Reducer
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "FETCH_TASKS":
                return {...state, tasks: action.payload}
            case "UPDATE_TASKS":
                return {tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, ...action.payload} : task)}
            default:
                return {...state}
        }
    }, initialState)
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {store, TaskProvider}