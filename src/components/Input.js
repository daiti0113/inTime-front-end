import React from "react"

export const Input = ({title, ...rest}) => (
    <div>
        {title && <label htmlFor={rest.id}>{title}</label>}
        <input {...rest} />
    </div>
)