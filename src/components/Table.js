import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {range} from "../helper/arrayManipulation"

const useStyles = createUseStyles({
    table: ({colCount}) => ({
        display: "grid",
        gridTemplateRows: `60px repeat(${colCount}, 30px) 1fr`,
        marginTop: 50,
        width: ""
    }),
    dateHeaderContainer: {
        display: "grid",
        gridTemplateRows: "30px 1fr",
        gridTemplateColumns: "200px 1fr",
        height: "500px",
        border: "1px solid"
    },
    dateHeaderDayContainer: ({displayPeriod}) => ({
        gridRow: "2 / 3",
        gridColumn: "2 / 3",
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, 20px)`,
        gridTemplateAreas: "title taskBar"
    }),
    dateHeaderDay: {
        borderLeft: "1px solid",
        borderTop: "1px solid",
        display: "flex",
        justifyContent: "center",
        paddingTop: 3
    },
    dateHeaderMonthContainer: ({displayPeriod}) => ({
        gridRow: "1 / 2",
        gridColumn: "2 / 3",
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, 20px)`,
    }),
    dateHeaderMonth: () => ({
        borderLeft: "1px solid",
        display: "flex",
        justifyContent: "center",
        paddingTop: 3
    }),
    dateHeaderTaskContainer: {
        gridRow: "1 / 3",
        gridColumn: "1 / 2",
        justifySelf: "center",
        paddingTop: 20
    },
    ruledLine: {

    },
    taskListContainer: {
        borderTop: "1px solid"
    },
})

const DateHeader = ({displayStartDate, displayPeriod}) => {
    const startDate = displayStartDate.getDate()
    const classes = useStyles({displayPeriod})

    return (
        <div className={classes.dateHeaderContainer}>
            <div className={classes.dateHeaderTaskContainer}>Task</div>
            <div className={classes.dateHeaderMonthContainer}>
                {/* TODO: don't use startDate */}
                {range(startDate, displayPeriod).map((_, idx) => {
                    displayStartDate.setDate(displayStartDate.getDate() + 1)
                    return (idx === 0 || displayStartDate.getDate() === 1) 
                        ? <div className={classes.dateHeaderMonth}>{displayStartDate.getMonth()}</div>
                        : <div />
                })}
            </div>
            <div className={classes.dateHeaderDayContainer}>
                {/* TODO: don't use startDate */}
                {range(startDate, displayPeriod).map(() => {
                    displayStartDate.setDate(displayStartDate.getDate() + 1)
                    return <div className={classes.dateHeaderDay}>{displayStartDate.getDate()}</div>
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
            <div className={classes.taskListContainer}>
                {tasks && tasks.map((task, idx) => <TaskBar key={idx+1} row={idx + 1} startDate={task.startDate} endDate={task.endDate}>{task.taskName}</TaskBar>)}
            </div>
        </div>
    )
}