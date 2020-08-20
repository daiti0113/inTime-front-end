import React, {useState, useContext} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"
import {signin} from "../helper/handleAuth"
import {userStore} from "../stores/userStore"

const useStyles = createUseStyles({
})

export const Login = () => {
    const {dispatch} = useContext(userStore)
    const [id, setId] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <Input title="ID" useState={[id, setId]} />
            <Input title="Password" useState={[password, setPassword]} type="password" />
            <input type="button" className="paper-btn btn-secondary" value="Login" onClick={signin(dispatch, id, password)} />
        </div>
    )
}