import React, {useState, useContext} from "react"
import {Input} from "./Input"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PlusIcon from "../assets/plus.svg" 
import {secondaryGray, primaryGray} from "../styles/color"
import {store} from "../stores/taskStore"
import {createData} from "../helper/handleData"
import {formatDate} from "../helper/convertDate"

const useStyles = createUseStyles({
    rangeDataPicker:{
        display: "grid",
        gridTemplateColumns: "200px 200px"
    },
    form: {
        display: "grid",
        gridTemplateColumns: "250px 450px 100px",
        alignItems: "center"
    },
    plusIcon: {
        fill: secondaryGray,
        cursor: "pointer",
        filter: `drop-shadow(3px 3px 5px ${secondaryGray})`,
        "&:hover": {
            fill: primaryGray
        }
    }
})

const RangeDataPicker = ({startDateUseState: [startDate, setStartDate], endDateUseState: [endDate, setEndDate]}) => {
    const classes = useStyles()

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

export const TaskAdditionForm = () => {
    const classes = useStyles()
    const [taskName, setTaskName] = useState("")
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const {state: {tasks}, dispatch} = useContext(store)

    return (
        <form className={classes.form}>
            <Input title="Task Name" type="text" placeholder="Make a cake" id="taskName" useState={[taskName, setTaskName]} />
            <RangeDataPicker startDateUseState={[startDate, setStartDate]} endDateUseState={[endDate, setEndDate]} />
            <PlusIcon className={classes.plusIcon} onClick={() => createData("/tasks", dispatch, {id: tasks.length + 1, taskName, startDate: formatDate(startDate), endDate: formatDate(endDate)})} />
        </form>
    )
}