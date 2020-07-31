import React from "react"
import {createUseStyles} from "react-jss"
import {getDateDiff} from "../helper/convertDate"
import GridLayout from "react-grid-layout"
import {hideAreaRowCount, colWidth, rowHeight} from "../styles/table"

const useStyles = createUseStyles({
    container: () => ({
        display: "grid",
        gridColumnGap: 1
    }),
    bar: {
        borderRight: "1px solid",
        whiteSpace: "nowrap",
        lineHeight: `${rowHeight}px`
    },
    barContainer: {
        maxHeight: "30px",
        marginLeft: `-${colWidth * hideAreaRowCount}px`,
        marginRight: `-${colWidth * hideAreaRowCount}px`
    }
})

export const TaskBar = ({children, startDate, endDate, displayStartDate, displayPeriod}) => {
    const classes = useStyles()
    const x = getDateDiff(displayStartDate, startDate) + hideAreaRowCount
    const w = getDateDiff(startDate, endDate) + 1

    return (
        <div className={classes.container}>
            <GridLayout className={`layout ${classes.barContainer}`} cols={hideAreaRowCount * 2 + displayPeriod} rowHeight={30} width={colWidth * (hideAreaRowCount * 2 + displayPeriod)} margin={[0, 0]}>
                <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2}`} key="a" data-grid={{x: x, y: 0, w: w, h: 1, maxH: 1}}>{children}</div>
            </GridLayout>
        </div>
    )

}
