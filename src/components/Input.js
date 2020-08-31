import React, {useState} from "react"
import {createUseStyles} from "react-jss"
import {ValidateMessageBox} from "./ValidateMessageBox"

const useStyles = createUseStyles({
    input: ({width}) => ({
        width: width
    })
})

const handleChange = (e, setState, setShowMessages) => {
    setState(e.target.value)
    setShowMessages(true)
}

export const Input = ({title, useState: [state, setState], setIsValid=() => {}, validationRules=[{validator: () => {}, message: ""}], width="200px", ...rest}) => {
    const classes = useStyles({width})
    const [showMessages, setShowMessages] = useState(false)

    return (
        <div>
            {title && <label htmlFor={rest.id}>{title}</label>}
            <input className={classes.input} value={state} onChange={e => handleChange(e, setState, setShowMessages)} {...rest} />
            <ValidateMessageBox input={state} setIsValid={setIsValid} validationRules={validationRules} showMessages={showMessages} />
        </div>
    )
}