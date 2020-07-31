import React from "react"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {gray} from "../styles/color"
import * as t from "../styles/table"

const useStyles = createUseStyles({
    table: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`,
        marginTop: 50,
        width: `${t.taskColWidth + displayPeriod * t.colWidth}px`
    }),
    taskListContainer: () => ({
        display: "grid",
        gridTemplateColumns: `${t.taskColWidth}px 1fr`,
        borderTop: `1px solid ${gray}`
    }),
    taskNameContainer: {
        display: "grid",
        gridTemplateRows: t.rowHeight,
        gridRowGap: t.rowGap,
        marginLeft: 4,
        background: "#FFFFFF"
    },
    taskBarContainer: {
        display: "grid",
        gridRowGap: t.rowGap,
        overflow: "hidden"
    }
})

export const TaskListContainer = ({tasks, displayPeriod, displayStartDate}) => {
    const classes = useStyles({displayPeriod})

    return (
        <div className={classes.taskListContainer}>
            {tasks && <>
                <div className={classes.taskNameContainer}>
                    {tasks.map(task => <div key={task.id}>{task.taskName}</div>)}
                </div>
                <div className={classes.taskBarContainer}>
                    {tasks.map((task) => <TaskBar key={task.id} startDate={new Date(task.startDate)} endDate={new Date(task.endDate)} displayStartDate={displayStartDate} displayPeriod={displayPeriod}>{task.taskName}</TaskBar>)}
                </div>
            </>}
        </div>
    )
}