import React from "react"

export const Input = ({title, useState: [state, setState],  ...rest}) => (
    <div>
        {title && <label htmlFor={rest.id}>{title}</label>}
        <input value={state} onChange={e => setState(e.target.value)} {...rest} />
    </div>
)