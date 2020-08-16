import React from "react"
import {createUseStyles} from "react-jss"
import {range} from "../helper/arrayManipulation"
import {primaryGray} from "../styles/color"
import * as t from "../styles/table"

const useStyles = createUseStyles({
    dateHeader: ({taskCount}) => ({
        display: "grid",
        gridTemplateRows: `${t.rowHeight}px 1fr`,
        height: `${(t.headerRowHeight + t.rowGap) + (taskCount * (t.rowHeight + t.rowGap))}px`
    }),
    dateContainer: ({displayPeriod}) => ({
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, ${t.colWidth}px)`,
        gridTemplateAreas: "title taskBar",
    }),
    date: {
        borderLeft: `1px solid ${primaryGray}`,
        borderTop: `1px solid ${primaryGray}`,
        display: "flex",
        justifyContent: "center",
        paddingTop: 3
    },
    monthContainer: ({displayPeriod}) => ({
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
            <div className={classes.monthContainer}>
                {generateInner(displayPeriod, new Date(displayStartDate), (currentDate, idx) => (idx === 0 || currentDate.getDate() === 1) ? <div className={classes.month} key={idx}>{currentDate.getMonth() + 1}</div> : <div key={idx} />)}
            </div>
            <div className={classes.dateContainer}>
                {generateInner(displayPeriod, new Date(displayStartDate), (currentDate, idx) => <div className={classes.date} key={idx}>{currentDate.getDate()}</div>)}
            </div>
        </div>
    )
}
