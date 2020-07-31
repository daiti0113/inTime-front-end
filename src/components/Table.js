import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {DateHeader} from "./DateHeader"
import * as t from "../styles/table"
import {TaskListContainer} from "./TaskListContainer"

const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`,
        marginTop: 50,
        width: `${t.taskColWidth + displayPeriod * t.colWidth}px`
    })
})


export const Table = () => {
    const [displayStartDate, setDisplayStartDate] = useState(new Date())
    const [displayPeriod, setDisplayPeriod] = useState(31)
    const [tasks, setTasks] = useState([])
    const taskCount = tasks.length
    const classes = useStyles({displayPeriod, taskCount})

    fetchData(useEffect, "/tasks", setTasks)

    return (
        <div className={classes.table}>
            <DateHeader displayStartDate={displayStartDate} displayPeriod={displayPeriod} taskCount={taskCount} />
            <TaskListContainer tasks={tasks} displayPeriod={displayPeriod} displayStartDate={displayStartDate} />
        </div>
    )
}