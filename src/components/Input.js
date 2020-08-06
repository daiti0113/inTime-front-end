import React from "react"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    input: ({width}) => ({
        width: width
    })
})

export const Input = ({title, useState: [state, setState], width="200px",  ...rest}) => {
    const classes = useStyles({width})

    return (
        <div>
            {title && <label htmlFor={rest.id}>{title}</label>}
            <input className={classes.input} value={state} onChange={e => setState(e.target.value)} {...rest} />
        </div>
    )
}