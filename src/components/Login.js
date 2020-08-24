import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {login} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"
import {useNavigate} from "react-router-dom"

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
    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <form className={classes.loginForm} onSubmit={e => login(e, dispatch, id, password, navigate)}>
                <Input title="ID" useState={[id, setId]} width="100%" />
                <Input title="Password" useState={[password, setPassword]} type="password" width="100%" />
                <div>{error ? error.errorMessage : ""}</div>
                <input type="submit" className="paper-btn btn-secondary" value="Login" />
            </form>
        </div>
    )
}