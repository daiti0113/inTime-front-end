import React from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    bar: ({row, startCol, endCol}) => ({
        gridRow: `${row} / ${row + 1}`,
        gridColumn: `${startCol} / ${endCol}`,
        overflow: "visible",
        whiteSpace: "nowrap",
        alignSelf: "center",
        paddingLeft: 5
    })
})

const getDay = (date) => {
    return date.replace(/^.+-/, "")
}

export const TaskBar = ({children, row, startDate, endDate}) => {
    const [startCol, endCol] = [getDay(startDate), getDay(endDate)]
    console.log(startCol, endCol)
    const classes = useStyles({row, startCol, endCol})

    return <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2} border-primary`}>{children}</div>
}
