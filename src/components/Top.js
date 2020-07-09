import React, {useState} from "react"
import {Input} from "./Input"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const useStyles = createUseStyles({
})

const RangeDataPicker = () => {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())

    return (
        <>
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} selectsStart startDate={startDate} endDate={endDate} />
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} selectsEnd startDate={startDate} endDate={endDate} minDate={startDate} />
        </>
    )
}
const Form = () => {
    // const date = new Date()

    return (
        <div>
            <Input title="Task Name" type="text" placeholder="Make a cake" id="taskName" />
            <RangeDataPicker />
        </div>
    )
}

export const Top = () => {
    return <Form />
}