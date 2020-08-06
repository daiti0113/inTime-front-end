import React, {useState, useEffect, useContext} from "react"
import {fetchData} from "../helper/handleData"
import {createUseStyles} from "react-jss"
import * as t from "../styles/table"
import {TaskListContainer} from "./TaskListContainer"
import {store} from "../stores/taskStore"
import {TaskNameContainer} from "./TaskNameContainer"
import {primaryGray} from "../styles/color"

// TODO: Change taskName to something easy to understand
// TODO: Use style constants
const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateColumns: `${t.taskColWidth}px 1fr`,
        marginTop: 50,
        maxWidth: `${t.taskColWidth + displayPeriod * t.colWidth + 2}px`,
        border: `1px solid ${primaryGray}`
    })
})

// MEMO: Move state "tasks" to TaskBar.js ??
export const Table = () => {
    const [displayStartDate, setDisplayStartDate] = useState(new Date())
    const [displayPeriod, setDisplayPeriod] = useState(31)
    const {state, dispatch} = useContext(store)
    const {tasks} = state
    const taskCount = tasks.length
    const classes = useStyles({displayPeriod, taskCount})

    fetchData(useEffect, "/tasks", dispatch)

    return (
        <div className={classes.table}>
            <TaskNameContainer tasks={tasks} />
            {/* <DateHeader displayStartDate={displayStartDate} displayPeriod={displayPeriod} taskCount={taskCount} /> */}
            <TaskListContainer tasks={tasks} displayPeriod={displayPeriod} displayStartDate={displayStartDate} taskCount={taskCount} />
        </div>
    )
}