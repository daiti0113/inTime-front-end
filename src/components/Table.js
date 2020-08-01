import React, {useState, useEffect, useContext} from "react"
import {fetchData} from "../helper/handleData"
import {createUseStyles} from "react-jss"
import {DateHeader} from "./DateHeader"
import * as t from "../styles/table"
import {TaskListContainer} from "./TaskListContainer"
import {store} from "../stores/taskStore"

const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`,
        marginTop: 50,
        width: `${t.taskColWidth + displayPeriod * t.colWidth}px`
    })
})

// MEMO: Move state "tasks" to TaskBar.js
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
            <DateHeader displayStartDate={displayStartDate} displayPeriod={displayPeriod} taskCount={taskCount} />
            <TaskListContainer tasks={tasks} displayPeriod={displayPeriod} displayStartDate={displayStartDate} />
        </div>
    )
}