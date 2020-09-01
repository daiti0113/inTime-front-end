import React from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        gridTemplateRows: "25px 50px"
    },
    input: ({width}) => ({
        width: width,
        maxHeight: "47px"
    })
})

const handleChange = (e, setState, setShowMessages) => {
    setState(e.target.value)
    setShowMessages(true)
}

export const Input = ({title, useState: [state, setState], setShowMessages=() => {}, width="100%", ...rest}) => {
    const classes = useStyles({width})

    return (
        <div className={classes.container}>
            {title && <label htmlFor={rest.id}>{title}</label>}
            <input className={classes.input} value={state} onChange={e => handleChange(e, setState, setShowMessages)} {...rest} />
        </div>
    )
}