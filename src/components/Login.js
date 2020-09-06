import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {sendEmailLink} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"
import {Link} from "react-router-dom"
import {useSomeStates} from "../helper/useSomeHooks"
import {validateRequired, validateMailAddress} from "../helper/validator"
import {ValidateMessageBox} from "./ValidateMessageBox"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        justifyItems: "center"
    },
    form: {
        display: "grid",
        gridTemplateRows: "75px 30px 80px 1fr",
        width: "100%",
        maxWidth: "300px"
    },
    link: {
        backgroundImage: "none"
    }
})

const emailValidationRules = [
    {validator: validateRequired, message: "Email is required."},
    {validator: validateMailAddress, message: "Email is badly formatted."}
]

// eslint-disable-next-line complexity
const convertMessage = (errorCode) => {
    switch (errorCode) {
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Incorrect mail or password."
        case "auth/too-many-requests":
            return "Too many failed attempts. Please try again in a few hours."
        case "auth/invalid-action-code":
        case "auth/argument-error":
            return "Invalid mail link. Please resend the verification email."
        default:
            return "Sorry, something went wrong."
    }
}

const handleSubmit = (e, dispatch, email, setIsMailSend) => {
    sendEmailLink(e, dispatch, email)
    setIsMailSend(true)
}

export const Login = () => {
    const classes = useStyles()
    const {state: {error}, dispatch} = useContext(userStore)
    const [[email, setEmail], [isValidEmail, setIsValidEmail], [showMessages, setShowMessages], [isMailSend, setIsMailSend]] = useSomeStates(useState, ["", "", false, false, false, false])

    return (
        <div className={classes.container}>
            {isMailSend && <div className="alert alert-success">{`We've sent an email to ${email} to verify your address. Please check the link in that email to login.`}</div>}
            {error.errorCode && <div className="alert alert-danger dismissible">{convertMessage(error.errorCode)}</div>}
            <div className={classes.form}>
                <Input title="Email" useState={[email, setEmail]} setShowMessages={setShowMessages} />
                <ValidateMessageBox input={email} setIsValid={setIsValidEmail} validationRules={emailValidationRules} showMessages={showMessages} />
                <input type="button" className="paper-btn btn-secondary" value="Login" onClick={e => isValidEmail ? handleSubmit(e, dispatch, email, setIsMailSend) : setShowMessages(true)} />
                <Link to="/signup" className={classes.link}>Signup</Link>
            </div>
        </div>
    )
}