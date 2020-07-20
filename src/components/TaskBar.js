import React from "react"
import {createUseStyles} from "react-jss"
import {getDay} from "../helper/convertDate"
import GridLayout from "react-grid-layout"

const useStyles = createUseStyles({
    bar: ({row, startCol, endCol}) => ({
        // gridRow: `${row + 1} / ${row + 2}`,
        // gridColumn: `${startCol + 1} / ${endCol + 2}`,
        // overflow: "auto",
        // whiteSpace: "nowrap",
        // alignSelf: "center",
        // paddingLeft: 5,
        // resize: "horizontal"
    }),
    grid: {
        borderRight: "1px solid"
    },
    gridLayout: {
        maxHeight: "30px"
    }
})

export const TaskBar = ({children, row, startDate, endDate}) => {
    const [startCol, endCol] = [getDay(startDate), getDay(endDate)]
    const classes = useStyles({row, startCol, endCol})

    console.log("startCol", startCol)
    console.log("width", endCol-startCol)

    // return <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2} border-primary`}>{children}</div>
    return (
        <GridLayout className={`layout ${classes.gridLayout}`} cols={31} rowHeight={30} width={620} margin={[0, 0]}>
            <div className={`${classes.grid} border border-${Math.floor( Math.random() * 5 ) + 2}`} key="a" data-grid={{x: startCol, y: 0, w: endCol-startCol, h: 1, maxH: 1}}>{children}</div>
        </GridLayout>
    )

}
