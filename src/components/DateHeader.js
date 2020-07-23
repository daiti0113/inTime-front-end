import React from "react"
import {createUseStyles} from "react-jss"
import {range} from "../helper/arrayManipulation"
import {gray} from "../styles"

const useStyles = createUseStyles({
    dateHeader: {
        display: "grid",
        gridTemplateRows: "30px 1fr",
        gridTemplateColumns: "200px 1fr",
        height: "500px",
        border: `1px solid ${gray}`
    },
    dateContainer: ({displayPeriod}) => ({
        gridRow: "2 / 3",
        gridColumn: "2 / 3",
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, 20px)`,
        gridTemplateAreas: "title taskBar"
    }),
    date: {
        borderLeft: `1px solid ${gray}`,
        borderTop: `1px solid ${gray}`,
        display: "flex",
        justifyContent: "center",
        paddingTop: 3
    },
    monthContainer: ({displayPeriod}) => ({
        gridRow: "1 / 2",
        gridColumn: "2 / 3",
        display: "grid",
        gridTemplateColumns: `repeat(${displayPeriod}, 20px)`,
    }),
    month: () => ({
        borderLeft: `1px solid ${gray}`,
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


export const DateHeader = ({displayStartDate, displayPeriod}) => {
    const classes = useStyles({displayPeriod})
    const monthCounter = new Date(displayStartDate)
    const dateCounter = new Date(displayStartDate)

    return (
        <div className={classes.dateHeader}>
            <div className={classes.task}>Task</div>
            <div className={classes.monthContainer}>
                {range(displayPeriod).map((_, idx) => {
                    const month = new Date(monthCounter)
                    monthCounter.setDate(monthCounter.getDate() + 1)
                    return (idx === 0 || month.getDate() === 1) 
                        ? <div className={classes.month}>{month.getMonth() + 1}</div>
                        : <div />
                })}
            </div>
            <div className={classes.dateContainer}>
                {range(displayPeriod).map(() => {
                    const date = new Date(dateCounter)
                    dateCounter.setDate(dateCounter.getDate() + 1)
                    return <div className={classes.date}>{date.getDate()}</div>
                })}
            </div>
        </div>
    )
}
