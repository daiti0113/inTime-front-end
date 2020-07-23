import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {DateHeader} from "./DateHeader"
import {gray} from "../styles"

const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateRows: `60px repeat(${displayPeriod}, 30px) 1fr`,
        marginTop: 50,
        width: `${200 + displayPeriod * 20}px`
    }),
    taskListContainer: {
        borderTop: `1px solid ${gray}`,
        padding: 5
    },
})


export const Table = () => {
    const [displayStartDate, setDisplayStartDate] = useState(new Date())
    const [displayPeriod, setDisplayPeriod] = useState(31)
    const [tasks, setTasks] = useState([])
    const colCount = 10
    const classes = useStyles({displayPeriod, colCount})

    fetchData(useEffect, "/tasks", setTasks)

    return (
        <div className={classes.table}>
            <DateHeader displayStartDate={displayStartDate} displayPeriod={displayPeriod} />
            <div className={classes.taskListContainer}>
                {tasks && tasks.map((task, idx) => <TaskBar key={idx+1} row={idx + 1} startDate={task.startDate} endDate={task.endDate}>{task.taskName}</TaskBar>)}
            </div>
        </div>
    )
}