import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {DateHeader} from "./DateHeader"
import {gray} from "../styles/color"
import * as t from "../styles/table"
import {bottom} from "../styles/zIndex"

const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`,
        marginTop: 50,
        width: `${t.taskColWidth + displayPeriod * t.colWidth}px`
    }),
    taskListContainer: ({taskCount}) => ({
        display: "grid",
        gridTemplateColumns: `${t.taskColWidth}px 1fr`,
        borderTop: `1px solid ${gray}`
    }),
    taskNameContainer: {
        display: "grid",
        gridTemplateRows: t.rowHeight,
        gridRowGap: t.rowGap,
        marginLeft: 4,
        background: "#FFFFFF",
    },
    taskBarContainer: {
        display: "grid",
        gridRowGap: t.rowGap
    }
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
            <div className={classes.taskListContainer}>
                <div className={classes.taskNameContainer}>
                    {tasks && tasks.map(task => <div>{task.taskName}</div>)}
                </div>
                <div className={classes.taskBarContainer}>
                    {tasks && tasks.map((task, idx) => <TaskBar key={idx+1} row={idx + 1} startDate={new Date(task.startDate)} endDate={new Date(task.endDate)} displayStartDate={displayStartDate}>{task.taskName}</TaskBar>)}
                </div>
            </div>
        </div>
    )
}