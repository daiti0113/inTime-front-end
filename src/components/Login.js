import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {login} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        justifyItems: "center"
    },
    loginForm: {
        display: "grid",
        gridTemplateRows: "80px 80px 30px 100px 1fr",
        width: "100%",
        maxWidth: "300px"
    }
})

export const Login = () => {
    const classes = useStyles()
    const {state: {error}, dispatch} = useContext(userStore)
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className={classes.container}>
            <div className={classes.loginForm}>
                <Input title="ID" useState={[id, setId]} width="100%" />
                <Input title="Password" useState={[password, setPassword]} type="password" width="100%" />
                <div>{error ? error.errorMessage : ""}</div>
                <input type="button" className="paper-btn btn-secondary" value="Login" onClick={() => login(dispatch, id, password)} />
            </div>
        </div>
    )
}