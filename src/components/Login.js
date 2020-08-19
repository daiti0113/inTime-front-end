import React, {useState} from "react"
import {createUseStyles} from "react-jss"
import {Input} from "./Input"

const useStyles = createUseStyles({
})


export const Login = () => {
    const idUseState = useState("")
    const passwordUseState = useState("")

    return (
        <div>
            <Input title="ID" useState={idUseState} />
            <Input title="Password" useState={passwordUseState} type="password" />
            <input type="button" className="paper-btn btn-secondary" value="Login"/>
        </div>
    )
}