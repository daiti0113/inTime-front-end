import React, {useContext} from "react"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {displaySettingStore} from "../stores/displaySettingStore"

const useStyles = createUseStyles({
})

const setDisplayStartDate = (dispatch, date) => dispatch({type: "UPDATE_DISPLAY_START_DATE", payload: date})
const setDisplayPeriod = (dispatch, value) => dispatch({type: "UPDATE_DISPLAY_PERIOD", payload: value})

const DisplayPeriodInput = ({dispatch}) => (
    <div>
        <label htmlFor="displayPeriod">Display Period</label>
        <select id="displayPeriod" onChange={e => setDisplayPeriod(dispatch, e.target.value)}>
            <option value={40}>40</option>
            <option value={30} selected>30</option>
            <option value={20}>20</option>
        </select>
    </div>
)

const DisplayStartDateInput = ({dispatch, displayStartDate}) => (
    <div>
        <label htmlFor="displayStartDate">Display Start Date</label>
        <DatePicker selected={displayStartDate} onChange={date => setDisplayStartDate(dispatch, date)} selectsStart id="displayStartDate" />
    </div>
)

export const DisplaySettingForm = () => {
    const classes = useStyles()
    const {state: {displayStartDate}, dispatch} = useContext(displaySettingStore)

    return (
        <form>
            <DisplayStartDateInput dispatch={dispatch} displayStartDate={displayStartDate} />
            <DisplayPeriodInput dispatch={dispatch} />
        </form>
    )
}