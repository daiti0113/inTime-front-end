import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {signup} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"
import {useNavigate} from "react-router-dom"
import {useSomeStates} from "../helper/useSomeHooks"
import {ValidateMessageBox} from "./ValidateMessageBox"
import {validateRequired, validateMailAddress, validateConfirm} from "../helper/validator"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        justifyItems: "center"
    },
    form: {
        display: "grid",
        gridTemplateRows: "110px 110px 110px 30px 100px 1fr",
        width: "100%",
        maxWidth: "300px"
    },
    input: {
        display: "grid",
        gridTemplateRows: "80px 30px"
    }
})

const emailValidationRules = [
    {validator: validateRequired, message: "Email is required."},
    {validator: validateMailAddress, message: "Email is badly formatted."}
]
const passwordValidationRules = [{validator: validateRequired, message: "Password is required."}]
const confirmRules = expect => [{validator: validateConfirm(expect), message: "Passwords need to match."}]

const EmailInput = ({useState: [email, setEmail], useShowMessageState: [showMessages, setShowMessages], setIsValid}) => {
    const classes = useStyles()

    return (
        <div className={classes.input}>
            <Input title="Email" useState={[email, setEmail]} width="100%" setShowMessages={setShowMessages} />
            <ValidateMessageBox input={email} setIsValid={setIsValid} validationRules={emailValidationRules} showMessages={showMessages} />
        </div>
    )
}

const PasswordInput = ({useState: [password, setPassword], useShowMessageState: [showMessages, setShowMessages], setIsValid}) => {
    const classes = useStyles()

    return (
        <div className={classes.input}>
            <Input title="Password" useState={[password, setPassword]} type="password" width="100%" setShowMessages={setShowMessages} />
            <ValidateMessageBox input={password} setIsValid={setIsValid} validationRules={passwordValidationRules} showMessages={showMessages} />
        </div>
    )
}

const ConfirmPasswordInput = ({useState: [confirmPassword, setConfirmPassword], useShowMessageState: [showMessages, setShowMessages], password, setIsValid}) => {
    const classes = useStyles()

    return (
        <div className={classes.input}>
            <Input title="Confirm Password" useState={[confirmPassword, setConfirmPassword]} type="password" width="100%" setShowMessages={setShowMessages} />
            <ValidateMessageBox input={confirmPassword} setIsValid={setIsValid} validationRules={confirmRules(password)} showMessages={showMessages} />
        </div>
    )
}

// TODO: Refactor here!!
export const Signup = () => {
    const classes = useStyles()
    const {state: {error}, dispatch} = useContext(userStore)
    const [
        [email, setEmail], [password, setPassword], [confirmPassword, setConfirmPassword], [showMessages, setShowMessages],
        [isValidEmail, setIsValidEmail], [isValidPassword, setIsValidPassword], [isValidConfirm, setIsValidConfirm]
    ] = useSomeStates(useState, ["", "", "", false, false, false ,false])
    const navigate = useNavigate()
    const isValid = isValidEmail && isValidPassword && isValidConfirm

    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <EmailInput useState={[email, setEmail]} useShowMessageState={[showMessages, setShowMessages]} setIsValid={setIsValidEmail} />
                <PasswordInput useState={[password, setPassword]} useShowMessageState={[showMessages, setShowMessages]} setIsValid={setIsValidPassword} />
                <ConfirmPasswordInput useState={[confirmPassword, setConfirmPassword]} useShowMessageState={[showMessages, setShowMessages]} setIsValid={setIsValidConfirm} password={password} />
                <div>{error ? error.errorMessage : ""}</div>
                <input type="submit" className="paper-btn btn-secondary" value="Signup" onClick={e => isValid ? signup(e, dispatch, email, password, navigate) : setShowMessages(true)} />
            </div>
        </div>
    )
}