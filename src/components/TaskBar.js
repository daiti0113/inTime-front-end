import React from "react"
import {createUseStyles} from "react-jss"
import {getDay, getDateDiff} from "../helper/convertDate"
import GridLayout from "react-grid-layout"
import {middle, bottom} from "../styles/zIndex"
import {taskColWidth, hideAreaRowCount} from "../styles/table"

const useStyles = createUseStyles({
    container: () => ({
        display: "grid",
        gridColumnGap: 1
    }),
    bar: {
        borderRight: "1px solid",
    },
    barContainer: {
        maxHeight: "30px",
        marginLeft: `-${taskColWidth * hideAreaRowCount}px`
    }
})

export const TaskBar = ({children, row, startDate, endDate, displayStartDate, displayPeriod}) => {
    // const [startCol, endCol] = [getDay(startDate), getDay(endDate)]
    const classes = useStyles({row/*, startCol, endCol*/})

    const x = getDateDiff(displayStartDate, startDate) + hideAreaRowCount
    const w = getDateDiff(startDate, endDate) + 1
    
    console.log("x:", x)
    console.log("w", w)

    return (
        <div className={classes.container}>
            <GridLayout className={`layout ${classes.barContainer}`} cols={displayPeriod + hideAreaRowCount} rowHeight={30} width={20 * (hideAreaRowCount + displayPeriod)} margin={[0, 0]}>
                <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2}`} key="a" data-grid={{x: x, y: 0, w: w, h: 1, maxH: 1}}>{children}</div>
            </GridLayout>
        </div>
    )

}
