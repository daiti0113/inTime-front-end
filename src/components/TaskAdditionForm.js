import React, {useState} from "react"
import {Input} from "./Input"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import PlusIcon from "../assets/plus.svg" 
import {gray} from "../styles/color"

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
        fill: gray,
        cursor: "pointer",
        "&:hover": {
            fill: "black"
        }
    }
})

const RangeDataPicker = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
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

    return (
        <div className={classes.form}>
            <Input title="Task Name" type="text" placeholder="Make a cake" id="taskName" />
            <RangeDataPicker />
            <PlusIcon className={classes.plusIcon} onClick={() => {console.log("Clicked!!!!!")}} />
        </div>
    )
}