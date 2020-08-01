import React, {useContext} from "react"
import {createUseStyles} from "react-jss"
import {getDateDiff, formatDate} from "../helper/convertDate"
import GridLayout from "react-grid-layout"
import {hideAreaRowCount, colWidth, rowHeight} from "../styles/table"
import {store} from "../stores/taskStore"
import {updateData} from "../helper/handleData"

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
        maxHeight: `${rowHeight}px`,
        marginLeft: `-${colWidth * hideAreaRowCount}px`,
        marginRight: `-${colWidth * hideAreaRowCount}px`
    }
})

const createTaskDateUpdater = (dispatch, displayStartDate) => (data, task) => {
    const startDate = new Date(displayStartDate)
    const endDate = new Date(displayStartDate)
    startDate.setDate(startDate.getDate() + data.x - hideAreaRowCount)
    endDate.setDate(startDate.getDate() + data.w - 1)
    updateData("/tasks", dispatch, {id: task.id, taskName: task.taskName, startDate: formatDate(startDate), endDate: formatDate(endDate)})
}

export const TaskBar = ({task, startDate, endDate, displayStartDate, displayPeriod}) => {
    const classes = useStyles()
    const x = getDateDiff(displayStartDate, startDate) + hideAreaRowCount
    const w = getDateDiff(startDate, endDate) + 1
    const {dispatch} = useContext(store)
    const updateTaskDate = createTaskDateUpdater(dispatch, displayStartDate)

    return (
        <div className={classes.container}>
            <GridLayout 
                className={`layout ${classes.barContainer}`} cols={hideAreaRowCount * 2 + displayPeriod}
                rowHeight={30} width={colWidth * (hideAreaRowCount * 2 + displayPeriod)} margin={[0, 0]}
                onResizeStop={data => updateTaskDate(data[0], task)}
            >
                <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2}`} key={task.id} data-grid={{x: x, y: 0, w: w, h: 1, maxH: 1}}>{task.taskName}</div>
            </GridLayout>
        </div>
    )

}
