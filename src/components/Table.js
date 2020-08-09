import React, {useEffect, useContext} from "react"
import {fetchData} from "../helper/handleData"
import {createUseStyles} from "react-jss"
import * as t from "../styles/table"
import {TaskListContainer} from "./TaskListContainer"
import {taskStore} from "../stores/taskStore"
import {displaySettingStore} from "../stores/displaySettingStore"
import {TaskNameContainer} from "./TaskNameContainer"
import {primaryGray} from "../styles/color"
import {DisplaySettingForm} from "./DisplaySettingForm"

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
    const {state: {tasks}, dispatch} = useContext(taskStore)
    const {state: {displayPeriod, displayStartDate}} = useContext(displaySettingStore)
    const displayTasks = tasks.filter(task => new Date(task.endDate) > displayStartDate)
    const taskCount = displayTasks.length
    const classes = useStyles({displayPeriod: displayPeriod, taskCount})

    fetchData(useEffect, "/tasks", dispatch)

    return (
        <>
            <DisplaySettingForm />
            <div className={classes.table}>
                <TaskNameContainer tasks={displayTasks} />
                <TaskListContainer tasks={displayTasks} taskCount={taskCount} />
            </div>
        </>
    )
}