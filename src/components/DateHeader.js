import React from "react"
import {createUseStyles} from "react-jss"
import {range} from "../helper/arrayManipulation"
import {primaryGray} from "../styles/color"
import * as t from "../styles/table"

const useStyles = createUseStyles({
    dateHeader: ({taskCount}) => ({
        display: "grid",
        gridTemplateRows: `${t.rowHeight}px 1fr`,
        gridTemplateColumns: `${t.taskColWidth}px 1fr`,
        height: `${(t.headerRowHeight + t.rowGap) + (taskCount * (t.rowHeight + t.rowGap))}px`,
        border: `1px solid ${primaryGray}`
    }),
    dateContainer: ({displayPeriod}) => ({
        gridRow: "2 / 3",
        gridColumn: "2 / 3",
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, ${t.colWidth}px)`,
        gridTemplateAreas: "title taskBar"
    }),
    date: {
        borderLeft: `1px solid ${primaryGray}`,
        borderTop: `1px solid ${primaryGray}`,
        display: "flex",
        justifyContent: "center",
        paddingTop: 3
    },
    monthContainer: ({displayPeriod}) => ({
        gridRow: "1 / 2",
        gridColumn: "2 / 3",
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, ${t.colWidth}px)`
    }),
    month: () => ({
        borderLeft: `1px solid ${primaryGray}`,
        display: "flex",
        justifyContent: "center",
        paddingTop: 3
    }),
    task: {
        gridRow: "1 / 3",
        gridColumn: "1 / 2",
        justifySelf: "center",
        paddingTop: 20
    }
})

const generateInner = (displayPeriod, dateCounter, Element) => range(displayPeriod).map((_, idx) => {
    const currentDate = new Date(dateCounter)
    dateCounter.setDate(dateCounter.getDate() + 1)
    return Element(currentDate, idx)
})

export const DateHeader = ({displayStartDate, displayPeriod, taskCount}) => {
    const classes = useStyles({displayPeriod, taskCount})

    return (
        <div className={classes.dateHeader}>
            <div className={classes.task}>Task</div>
            <div className={classes.monthContainer}>
                {generateInner(displayPeriod, new Date(displayStartDate), (currentDate, idx) => (idx === 0 || currentDate.getDate() === 1) ? <div className={classes.month}>{currentDate.getMonth() + 1}</div> : <div />)}
            </div>
            <div className={classes.dateContainer}>
                {generateInner(displayPeriod, new Date(displayStartDate), (currentDate) => <div className={classes.date}>{currentDate.getDate()}</div>)}
            </div>
        </div>
    )
}
