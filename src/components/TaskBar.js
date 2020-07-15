import React from "react"
import {createUseStyles} from "react-jss"
import {getDay} from "../helper/convertDate"

const useStyles = createUseStyles({
    bar: ({row, startCol, endCol}) => ({
        gridRow: `${row + 1} / ${row + 2}`,
        gridColumn: `${startCol + 1} / ${endCol + 2}`,
        overflow: "auto",
        whiteSpace: "nowrap",
        alignSelf: "center",
        paddingLeft: 5,
        resize: "horizontal"
    })
})

export const TaskBar = ({children, row, startDate, endDate}) => {
    const [startCol, endCol] = [getDay(startDate), getDay(endDate)]
    console.log(startCol, endCol)
    const classes = useStyles({row, startCol, endCol})

    return <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2} border-primary`}>{children}</div>
}
