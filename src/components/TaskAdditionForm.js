import React, {useState, useContext} from "react"
import {Input} from "./Input"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PlusIcon from "../assets/plus.svg" 
import {secondaryGray, primaryGray} from "../styles/color"
import {taskStore} from "../stores/taskStore"
import {userStore} from "../stores/userStore"
import {createData} from "../helper/handleData"
import {formatDate} from "../helper/convertDate"
import {useSomeContexts} from "../helper/useSomeContexts"

const useStyles = createUseStyles({
    rangeDataPicker:{
        display: "grid",
        gridTemplateColumns: "180px 180px"
    },
    form: {
        display: "grid",
        gridTemplateColumns: "250px 450px 100px",
        alignItems: "center"
    },
    plusIcon: ({taskName}) => ({
        fill: secondaryGray,
        cursor: taskName ? "pointer" : "not-allowed",
        width: "70px",
        height: "70px",
        filter: `drop-shadow(1px 2px 2px ${secondaryGray})`,
        transition: ".15s",
        "&:hover": {
            fill: primaryGray
        },
        "&:active": taskName ? {
            "-webkit-transform": "translateY(1px)",
            transform: "translateY(1px)",
            filter: "initial",
            fill: secondaryGray
        } : {}
    })
})

const RangeDataPicker = ({startDateUseState: [startDate, setStartDate], endDateUseState: [endDate, setEndDate]}) => {
    const classes = useStyles({})

    return (
        <div className={classes.rangeDataPicker}>
            <div>
                <label htmlFor="startDate">Start Date</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} id="startDate" />
            </div>
            <div>
                <label htmlFor="endDate">End Date</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} id="endDate" />
            </div>
        </div>
    )
}

const handleClick = (dispatch, tasks, user, {taskName, startDate, endDate}) => {
    taskName && createData("tasks", dispatch, {id: tasks.length + 1, taskName, startDate: formatDate(startDate), endDate: formatDate(endDate), uid: user.uid})
}

export const TaskAdditionForm = () => {
    const [taskName, setTaskName] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const classes = useStyles({taskName})
    const [{state: {tasks}, dispatch}, {state: {user}}] = useSomeContexts(useContext, [taskStore, userStore])

    return (
        <form className={classes.form}>
            <Input title="Task Name" type="text" placeholder="Make a cake" id="taskName" useState={[taskName, setTaskName]} />
            <RangeDataPicker startDateUseState={[startDate, setStartDate]} endDateUseState={[endDate, setEndDate]} />
            <PlusIcon className={`${classes.plusIcon}`} onClick={() => handleClick(dispatch, tasks, user, {taskName, startDate, endDate})} />
        </form>
    )
}