import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {getTaskDuration} from "../helper/convertDate"

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
    date: ({rowCount}) => ({
        display: "grid",
        gridTemplateColumns: `repeat(${rowCount}, 20px)`,
        gridTemplateAreas: "title taskBar"
    }),
    day: {
        borderLeft: "1px solid"
    },
})

const DateHeader = ({year, month, rowCount}) => {
    const startDate = new Date(year, month, 1) // 月の最初の日を取得
    const endDate = new Date(year, month + 1,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日

    const classes = useStyles({rowCount})
    return (
        <div className={`${classes.dateHeader}`}>
            <div>Task</div>
            <div className={classes.date}>
                {[...Array(endDayCount)].map((_, date) => <div className={classes.day}>{date+1}</div>)}
            </div>
        </div>
    )
}


export const Table = () => {
    const date = new Date()
    const [year, setYear] = useState(date.getFullYear())
    const [month, setMonth] = useState(date.getMonth())
    const [tasks, setTasks] = useState([])
    const rowCount = 31
    const colCount = 10
    const classes = useStyles({rowCount, colCount})

    fetchData(useEffect, "/tasks", setTasks)

    return (
        <div className={classes.table}>
            <DateHeader year={year} month={month} rowCount={rowCount} />
            {tasks && tasks.map((task, idx) => <TaskBar key={idx+1} row={idx + 1} startDate={task.startDate} endDate={task.endDate}>{task.taskName}</TaskBar>)}
        </div>
    )
}