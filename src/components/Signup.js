import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {signup} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"
import {useNavigate} from "react-router-dom"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        justifyItems: "center"
    },
    form: {
        display: "grid",
        gridTemplateRows: "80px 80px 80px 30px 100px 1fr",
        width: "100%",
        maxWidth: "300px"
    }
})

export const Signup = () => {
    const classes = useStyles()
    const {state: {error}, dispatch} = useContext(userStore)
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={e => signup(e, dispatch, id, password, navigate)}>
                <Input title="Email" useState={[id, setId]} width="100%" />
                <Input title="Password" useState={[password, setPassword]} type="password" width="100%" />
                <Input title="Confirm Password" useState={[confirmPassword, setConfirmPassword]} type="password" width="100%" />
                <div>{error ? error.errorMessage : ""}</div>
                <input type="submit" className="paper-btn btn-secondary" value="Signup" />
            </form>
        </div>
    )
}