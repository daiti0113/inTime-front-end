import React from "react"
import {createUseStyles} from "react-jss"
import {danger} from "../styles/color"

const useStyles = createUseStyles({
    container:{
        color: danger,
        fontSize: 18
    }
})

const handleInvalid = (setIsValid, message) => {
    setIsValid(false)
    return message
}

export const ValidateMessageBox = ({input, setIsValid=() => {}, validationRules=[{validator: () => {}, message: ""}], showMessages="false"}) => {
    const classes = useStyles()
    const messages = validationRules.map(rule => rule.validator(input) ? "" : handleInvalid(setIsValid, rule.message))
    messages.every(message => message === "") && setIsValid(true)

    return <div className={classes.container}>{showMessages ? <div>{messages.join(" ")}</div> : false}</div>
}