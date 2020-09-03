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
import {useSomeContexts, useSomeStates} from "../helper/useSomeHooks"
import {validateRequired} from "../helper/validator"
import {ValidateMessageBox} from "./ValidateMessageBox"

const useStyles = createUseStyles({
    rangeDataPicker:{
        display: "grid",
        gridTemplateColumns: "180px 180px"
    },
    form: {
        display: "grid",
        gridTemplateColumns: "220px 450px 100px",
        alignItems: "start"
    },
    plusIcon: ({isValid}) => ({
        fill: secondaryGray,
        cursor: isValid ? "pointer" : "not-allowed",
        width: "70px",
        height: "70px",
        filter: `drop-shadow(1px 2px 2px ${secondaryGray})`,
        transition: ".15s",
        "&:hover": {
            fill: primaryGray
        },
        "&:active": isValid ? {
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

const handleClick = (dispatch, tasks, user, setShowMessages, setStartDate, setEndDate, {taskName, startDate, endDate}) => {
    setStartDate(new Date())
    setEndDate(new Date())
    taskName ? createData("tasks", dispatch, {id: tasks.length + 1, taskName, startDate: formatDate(startDate), endDate: formatDate(endDate), uid: user.uid}) : setShowMessages(true)
}

export const TaskAdditionForm = () => {
    const [
        [taskName, setTaskName],[startDate, setStartDate],
        [endDate, setEndDate],[isValid, setIsValid],
        [showMessages, setShowMessages]
    ] = useSomeStates(useState, ["", new Date(), new Date(), false, false])
    const classes = useStyles({isValid})
    const [{state: {tasks}, dispatch}, {state: {user}}] = useSomeContexts(useContext, [taskStore, userStore])

    return (
        <form className={classes.form}>
            <div>
                <Input title="Task Name" type="text" placeholder="Make a cake" id="taskName" useState={[taskName, setTaskName]} setShowMessages={setShowMessages} width="200px" />
                <ValidateMessageBox input={taskName} setIsValid={setIsValid} validationRules={[{validator: validateRequired, message: "Task name is required."}]} showMessages={showMessages} />
            </div>
            <RangeDataPicker startDateUseState={[startDate, setStartDate]} endDateUseState={[endDate, setEndDate]} />
            <PlusIcon className={`${classes.plusIcon}`} onClick={() => handleClick(dispatch, tasks, user, setShowMessages, setStartDate, setEndDate, {taskName, startDate, endDate})} />
        </form>
    )
}