import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {range} from "../helper/arrayManipulation"

const useStyles = createUseStyles({
    table: ({colCount}) => ({
        display: "grid",
        gridTemplateRows: `30px repeat(${colCount}, 30px) 1fr`,
        marginTop: 50,
        width: ""
    }),
    dateHeader: {
        display: "grid",
        gridTemplateColumns: `200px 1fr`,
        height: "500px",
        border: "1px solid"
    },
    date: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, 20px)`,
        gridTemplateAreas: "title taskBar"
    }),
    day: {
        borderLeft: "1px solid"
    },
})

const DateHeader = ({displayStartDate, displayPeriod}) => {
    const startDate = displayStartDate.getDate()
    const classes = useStyles({displayPeriod})

    return (
        <div className={classes.dateHeader}>
            <div>Task</div>
            <div className={classes.date}>
                {/* TODO: don't use startDate */}
                {range(startDate, displayPeriod).map(() => {
                    displayStartDate.setDate(displayStartDate.getDate() + 1)
                    return (<div className={classes.day}>{displayStartDate.getDate()}</div>)
                })}
            </div>
        </div>
    )
}


export const Table = () => {
    const [displayStartDate, setDisplayStartDate] = useState(new Date())
    const [displayPeriod, setDisplayPeriod] = useState(31)
    const [tasks, setTasks] = useState([])
    const rowCount = 31
    const colCount = 10
    const classes = useStyles({rowCount, colCount})

    fetchData(useEffect, "/tasks", setTasks)

    return (
        <div className={classes.table}>
            <DateHeader displayStartDate={displayStartDate} displayPeriod={displayPeriod} />
            {tasks && tasks.map((task, idx) => <TaskBar key={idx+1} row={idx + 1} startDate={task.startDate} endDate={task.endDate}>{task.taskName}</TaskBar>)}
        </div>
    )
}