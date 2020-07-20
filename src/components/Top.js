import React, {useState} from "react"
import {Input} from "./Input"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {Table} from "./Table"
import {RglPoc} from "./PoCReactGridLayout"

const useStyles = createUseStyles({
    rangeDataPicker:{
        display: "grid",
        gridTemplateColumns: "200px 200px"
    },
    form: {
        display: "grid",
        gridTemplateColumns: "500px 500px"
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

const Form = () => {
    const classes = useStyles()

    return (
        <div className={classes.form}>
            <Input title="Task Name" type="text" placeholder="Make a cake" id="taskName" />
            <RangeDataPicker />
        </div>
    )
}

export const Top = () => {
    return (
        <div>
            <Form />
            <Table />
        </div>
    )
}