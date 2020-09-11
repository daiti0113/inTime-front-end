import React from "react"
import {createUseStyles} from "react-jss"
import {primaryGray} from "../styles/color"
import * as t from "../styles/table"

// TODO: Change taskName to something easy to understand
// TODO: Use style constants
const useStyles = createUseStyles({
    container: {
        display: "grid",
        gridTemplateRows: `${t.headerRowHeight}px 1fr`
    },
    header: {
        alignSelf: "center",
        justifySelf: "center"
    },
    taskNameContainer: ({taskCount}) => ({
        display: "grid",
        gridTemplateRows: `repeat(${taskCount}, ${t.rowHeight}px)`,
        gridGap: t.rowGap,
        height: `${taskCount * (t.rowHeight + t.rowGap) + 5}px`,
        padding: 5,
        borderTop: `1px solid ${primaryGray}`,
        alignItems: "center"
    }),
    taskName: {
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    }
})

export const TaskNameContainer = ({tasks}) => {
    const classes = useStyles({taskCount: tasks.length})

    return (
        <div className={classes.container}>
            <div className={classes.header}>Task</div>
            <div className={classes.taskNameContainer}>
                {tasks && tasks.map(task => <div key={task.id} className={classes.taskName}>{task.taskName}</div>)}
            </div>
        </div>
    )
}