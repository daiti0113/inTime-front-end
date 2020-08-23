import React, {useContext, useState} from "react"
import {createUseStyles} from "react-jss"
import {getDateDiff, formatDate} from "../helper/convertDate"
import GridLayout from "react-grid-layout"
import {hideAreaColCount, colWidth, rowHeight} from "../styles/table"
import {taskStore} from "../stores/taskStore"
import {displaySettingStore} from "../stores/displaySettingStore"
import {userStore} from "../stores/userStore"
import {updateData} from "../helper/handleData"
import {useSomeContexts} from "../helper/useSomeContexts"
import {TaskEditModal} from "./TaskEditModal"

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

const createTaskDateUpdater = (dispatch, displayStartDate, task, uid) => data => {
    const startDate = new Date(displayStartDate)
    const endDate = new Date(displayStartDate)
    startDate.setDate(startDate.getDate() + data.x - hideAreaColCount)
    endDate.setDate(startDate.getDate() + data.w - 1)
    updateData("tasks", dispatch, {id: task.id, taskName: task.taskName, startDate: formatDate(startDate), endDate: formatDate(endDate), uid: uid})
}

const handleDragStop = (data, updateTaskDate, isClicked, setIsClicked) => {
    isClicked && updateTaskDate(data[0])
    setIsClicked(false)
}

const handleClick = (isClicked, setModalOpen) => isClicked && setModalOpen(true)

// eslint-disable-next-line max-lines-per-function
export const TaskBar = ({task, startDate, endDate}) => {
    const [{state: {displayPeriod, displayStartDate}}, {dispatch}, {state: {user}}] = useSomeContexts(useContext, [displaySettingStore, taskStore, userStore])
    const updateTaskDate = createTaskDateUpdater(dispatch, displayStartDate, task, user.uid)
    const x = getDateDiff(displayStartDate, startDate) + hideAreaColCount
    const w = getDateDiff(startDate, endDate) + 1
    const classes = useStyles({x})
    const [[isClicked, setIsClicked], [modalOpen, setModalOpen]] = [useState(false), useState(false)]

    return (
        <div className={classes.container}>
            <GridLayout 
                className={`layout ${classes.barContainer}`} cols={hideAreaColCount * 2 + displayPeriod}
                rowHeight={30} width={colWidth * (hideAreaColCount * 2 + displayPeriod)} margin={[0, 0]}
                layout={[{x: x, y: 0, w: w, h: 1, maxH: 1}]} onDragStart={() => setIsClicked(true)}
                onResizeStop={data => updateTaskDate(data[0])} onDragStop={data => handleDragStop(data, updateTaskDate, isClicked, setIsClicked)}
            >
                <div className={`${classes.bar} border border-${Math.floor( Math.random() * 5 ) + 2}`} key={task.id}data-grid={{x: x, y: 0, w: w, h: 1, maxH: 1}} onClick={() => handleClick(isClicked, setModalOpen)}>{task.taskName}</div>
            </GridLayout>
            {modalOpen && <TaskEditModal modalOpen={modalOpen} setModalOpen={setModalOpen} task={task} />}
        </div>
    )
}
