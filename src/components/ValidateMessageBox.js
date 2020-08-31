import React from "react"
import {createUseStyles} from "react-jss"
import {danger} from "../styles/color"

const useStyles = createUseStyles({
    container:{
        color: danger
    }
})

const handleInvalid = (setIsValid, message) => {
    setIsValid(false)
    return <div>{message}</div>
}

export const ValidateMessageBox = ({input, setIsValid, validationRules=[{validator: () => {}, message: ""}], showMessages}) => {
    const classes = useStyles()
    const messageElements = validationRules.map(rule => rule.validator(input) ? true : handleInvalid(setIsValid, rule.message))
    
    messageElements.every(el => el === true) && setIsValid(true)

    return <div className={classes.container}>{showMessages ? messageElements : false}</div>
}