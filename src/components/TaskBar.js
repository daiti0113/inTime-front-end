import React from "react"
import {createUseStyles} from "react-jss"
import {getDay, getDateDiff} from "../helper/convertDate"
import GridLayout from "react-grid-layout"

const useStyles = createUseStyles({
    container: () => ({
        display: "grid",
        gridTemplateColumns: `140px 1fr`,
        gridColumnGap: 1
    }),
    bar: {
        borderRight: "1px solid",
        marginLeft: "-20px"
    },
    barContainer: {
        maxHeight: "30px"
    },
    taskName: {
        marginLeft: 4,
        background: "#FFFFFF",
        zIndex: 101
    }
})

export const TaskBar = ({children, row, startDate, endDate, displayStartDate}) => {
    // const [startCol, endCol] = [getDay(startDate), getDay(endDate)]
    const classes = useStyles({row/*, startCol, endCol*/})

    const x = getDateDiff(displayStartDate, startDate)
    const w = getDateDiff(startDate, endDate)

    console.log(x)
    console.log("startDate", w)

    return (
        <div className={classes.container}>
            <div className={classes.taskName}>{children}</div>
            <GridLayout className={`layout ${classes.barContainer}`} cols={31} rowHeight={30} width={620} margin={[0, 0]}>
                <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2}`} key="a" data-grid={{x: x + 1, y: 0, w: w, h: 1, maxH: 1}}>{children}</div>
            </GridLayout>
        </div>
    )

}
