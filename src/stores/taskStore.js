import React, {createContext, useReducer} from "react"

const initialState = {tasks: []}

// Define Store
const taskStore = createContext(initialState)

// Defin Provider
const {Provider} = taskStore
const TaskProvider = ({children}) => {
    // Define Reducer
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "FETCH_TASKS":
                return {...state, tasks: action.payload}
            case "UPDATE_TASKS":
                return {...state, tasks: state.tasks.map(task => task.id === action.payload.id ? {...task, ...action.payload} : task)}
            case "CREATE_TASKS":
                return {...state, tasks: state.tasks.concat(action.payload)}
            default:
                return {...state}
        }
    }, initialState)
    return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {taskStore, TaskProvider}