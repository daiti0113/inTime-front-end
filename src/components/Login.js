import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {login} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"
import {useNavigate, Link} from "react-router-dom"
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
        gridTemplateRows: "75px 30px 75px 30px 30px 80px 1fr",
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
const passwordValidationRules = [{validator: validateRequired, message: "Password is required."}]

const convertMessage = (errorCode) => {
    switch (errorCode) {
        case "auth/user-disabled":
        case "auth/user-not-found":
        case "auth/wrong-password":
            return "Incorrect mail or password."
        case "auth/too-many-requests":
            return "Too many failed attempts. Please try again in a few hours."
        default:
            return "Sorry, something went wrong."
    }
}

export const Login = () => {
    const classes = useStyles()
    const {state: {error}, dispatch} = useContext(userStore)
    const [[email, setEmail], [password, setPassword], [isValidEmail, setIsValidEmail], [isValidPassword, setIsValidPassword], [showMessages, setShowMessages]] = useSomeStates(useState, ["", "", false, false, false])
    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <Input title="Email" useState={[email, setEmail]} setShowMessages={setShowMessages} />
                <ValidateMessageBox input={email} setIsValid={setIsValidEmail} validationRules={emailValidationRules} showMessages={showMessages} />
                <Input title="Password" useState={[password, setPassword]} type="password" setShowMessages={setShowMessages} />
                <ValidateMessageBox input={password} setIsValid={setIsValidPassword} validationRules={passwordValidationRules} showMessages={showMessages} />
                <div>{error.errorCode ? convertMessage(error.errorCode) : ""}</div>
                <input type="button" className="paper-btn btn-secondary" value="Login" onClick={e => isValidEmail && isValidPassword ? login(e, dispatch, email, password, navigate) : setShowMessages(true)} />
                <Link to="/signup" className={classes.link}>Signup</Link>
            </div>
        </div>
    )
}