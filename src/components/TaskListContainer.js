import React from "react"
import {createUseStyles} from "react-jss"
import {TaskBar} from "./TaskBar"
import {primaryGray} from "../styles/color"
import * as t from "../styles/table"
import {DateHeader} from "./DateHeader"

// TODO: Change taskName to something easy to understand
// TODO: Use style constants
const useStyles = createUseStyles({
    taskListContainer: {
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`,
        overflow: "scroll"
    },
    taskBarContainer: ({taskCount}) => ({
        display: "grid",
        gridTemplateRows: `repeat(${taskCount}, ${t.rowHeight}px)`,
        gridGap: t.rowGap,
        height: `${taskCount * (t.rowHeight + t.rowGap) + 5}px`,
        paddingTop: 5,
        borderTop: `1px solid ${primaryGray}`,
        overflow: "hidden"
    })
})

export const TaskListContainer = ({tasks, displayPeriod, displayStartDate, taskCount}) => {
    const classes = useStyles({displayPeriod, taskCount})

    return (
        <div className={classes.taskListContainer}>
            <DateHeader displayStartDate={displayStartDate} displayPeriod={displayPeriod} taskCount={taskCount} />
            <div className={classes.taskBarContainer}>
                {tasks && tasks.map((task) => <TaskBar key={task.id} task={task} startDate={new Date(task.startDate)} endDate={new Date(task.endDate)} displayStartDate={displayStartDate} displayPeriod={displayPeriod} />)}
            </div>
        </div>
    )
}