import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {DateHeader} from "./DateHeader"
import {gray} from "../styles/color"
import * as t from "../styles/table"

const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`,
        marginTop: 50,
        width: `${t.taskColWidth + displayPeriod * t.colWidth}px`
    }),
    taskListContainer: ({taskCount}) => ({
        display: "grid",
        gridTemplateRows: `repeat(${taskCount}, ${t.rowHeight}px)`,
        gridRowGap: t.rowGap,
        borderTop: `1px solid ${gray}`,
        paddingTop: 5
    }),
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
                {tasks && tasks.map((task, idx) => <TaskBar key={idx+1} row={idx + 1} startDate={task.startDate} endDate={task.endDate}>{task.taskName}</TaskBar>)}
            </div>
        </div>
    )
}