import React from "react"
import {createUseStyles} from "react-jss"
import {getDay} from "../helper/convertDate"
import GridLayout from "react-grid-layout"

const useStyles = createUseStyles({
    bar: () => ({
        display: "grid",
        gridTemplateColumns: `200px 1fr`,
        gridColumnGap: 1
    }),
    grid: {
        borderRight: "1px solid"
    },
    gridLayout: {
        maxHeight: "30px"
    },
    taskName: {
        paddingLeft: 4
    }
})

export const TaskBar = ({children, row, startDate, endDate}) => {
    const [startCol, endCol] = [getDay(startDate), getDay(endDate)]
    const classes = useStyles({row, startCol, endCol})

    console.log("startCol", startCol)
    console.log("width", endCol-startCol)

    return (
        <div className={classes.bar}>
            <div className={classes.taskName}>{children}</div>
            <GridLayout className={`layout ${classes.gridLayout}`} cols={31} rowHeight={30} width={620} margin={[0, 0]}>
                <div className={`${classes.grid} border border-${Math.floor( Math.random() * 5 ) + 2}`} key="a" data-grid={{x: startCol, y: 0, w: endCol-startCol, h: 1, maxH: 1}}>{children}</div>
            </GridLayout>
        </div>
    )

}
