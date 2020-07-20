import React, {useState, useEffect} from "react"
import {fetchData} from "../helper/fetchData"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {getTaskDuration} from "../helper/convertDate"

const useStyles = createUseStyles({
    table: ({colCount}) => ({
        display: "grid",
        gridTemplateRows: `30px repeat(${colCount}, 30px)`,
        marginTop: 50
    }),
    // oddRowCell: {
    //     borderLeft: "solid 0.5px #41403e !important",
    //     borderBottom: "solid 0.5px #41403e !important"
    // },
    // evenRowCell: {
    //     borderLeft: "solid 0.5px #41403e !important",
    //     borderBottom: "solid 0.5px #41403e !important",
    //     background: "#d0dbc2"
    // },
    row: ({rowCount}) => ({
        display: "grid",
        gridTemplateColumns: `200px repeat(${rowCount}, 20px)`,
        gridTemplateAreas: "title taskBar"
    })
})

const createRow = (year, month, UiElement, style="", taskDuration = 0) => {
    const startDate = new Date(year, month, 1) // 月の最初の日を取得
    const endDate = new Date(year, month + 1,  0) // 月の最後の日を取得
    const endDayCount = endDate.getDate() // 月の末日
    console.log(endDayCount, taskDuration)

    // eslint-disable-next-line react/jsx-key
    return [...Array(endDayCount - taskDuration)].map((_, idx) => <UiElement style={style} idx={idx + 1} />)
}

const FillInEl = ({style}) => <span className={style} />
const HeaderEl = ({idx}) => <div>{idx}</div>

const TableHeader = ({year, month, rowCount}) => {
    const classes = useStyles({rowCount})
    return (
        <div className={classes.row}>
            <div>Task</div>
            {createRow(year, month, HeaderEl)}
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
            <TableHeader year={year} month={month} rowCount={rowCount} />
            {tasks && tasks.map((task, idx) => {
                return (
                    <div className={classes.row}>
                        taskName
                        <TaskBar key={idx+1} row={idx + 1} startDate={task.startDate} endDate={task.endDate}>{task.taskName}</TaskBar>
                        {/* {createRow(year, month, FillInEl, ((idx + 1) % 2 === 0) ? classes.oddRowCell : classes.evenRowCell, getTaskDuration(task.startDate, task.endDate))} */}
                    </div>
                )
            })}
        </div>
    )
}