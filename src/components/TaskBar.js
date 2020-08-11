import React, {useContext} from "react"
import {createUseStyles} from "react-jss"
import {getDateDiff, formatDate} from "../helper/convertDate"
import GridLayout from "react-grid-layout"
import {hideAreaColCount, colWidth, rowHeight} from "../styles/table"
import {taskStore} from "../stores/taskStore"
import {displaySettingStore} from "../stores/displaySettingStore"
import {updateData} from "../helper/handleData"
import {useSomeContexts} from "../helper/useSomeContexts"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        gridColumnGap: 1
    },
    bar: ({x}) => ({
        borderRight: "1px solid",
        whiteSpace: "nowrap",
        lineHeight: `${rowHeight}px`,
        paddingLeft: x < hideAreaColCount ? -(x - hideAreaColCount) * colWidth : 0
    }),
    barContainer: {
        maxHeight: `${rowHeight}px`,
        marginLeft: `-${colWidth * hideAreaColCount}px`,
        marginRight: `-${colWidth * hideAreaColCount}px`
    }
})

const createTaskDateUpdater = (dispatch, displayStartDate, task) => data => {
    const startDate = new Date(displayStartDate)
    const endDate = new Date(displayStartDate)
    startDate.setDate(startDate.getDate() + data.x - hideAreaColCount)
    endDate.setDate(startDate.getDate() + data.w - 1)
    updateData("/tasks", dispatch, {id: task.id, taskName: task.taskName, startDate: formatDate(startDate), endDate: formatDate(endDate)})
}

export const TaskBar = ({task, startDate, endDate}) => {
    const [{state: {displayPeriod, displayStartDate}}, {dispatch}] = useSomeContexts(useContext, [displaySettingStore, taskStore])
    const updateTaskDate = createTaskDateUpdater(dispatch, displayStartDate, task)
    const x = getDateDiff(displayStartDate, startDate) + hideAreaColCount
    const w = getDateDiff(startDate, endDate) + 1
    const classes = useStyles({x})

    return (
        <div className={classes.container}>
            <GridLayout 
                className={`layout ${classes.barContainer}`} cols={hideAreaColCount * 2 + displayPeriod}
                rowHeight={30} width={colWidth * (hideAreaColCount * 2 + displayPeriod)} margin={[0, 0]}
                layout={[{x: x, y: 0, w: w, h: 1, maxH: 1}]}
                onResizeStop={data => updateTaskDate(data[0])} onDragStop={data => updateTaskDate(data[0])}
            >
                <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2}`} key={task.id} data-grid={{x: x, y: 0, w: w, h: 1, maxH: 1}}>{task.taskName}</div>
            </GridLayout>
        </div>
    )
}
