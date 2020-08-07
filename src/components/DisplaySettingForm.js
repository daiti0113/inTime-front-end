import React, {useContext} from "react"
import {createUseStyles} from "react-jss"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {displaySettingStore} from "../stores/displaySettingStore"

const useStyles = createUseStyles({
})

const setDisplayStartDate = (dispatch, date) => dispatch({type: "UPDATE_DISPLAY_START_DATE", payload: date})


export const DisplaySettingForm = () => {
    const classes = useStyles()
    const {state: {displayStartDate}, dispatch} = useContext(displaySettingStore)

    return (
        <form className={classes.form}>
            <div>
                <label htmlFor="startDate">Display Start Date</label>
                <DatePicker selected={displayStartDate} onChange={date => setDisplayStartDate(dispatch, date)} selectsStart id="startDate" />
            </div>
        </form>
    )
}