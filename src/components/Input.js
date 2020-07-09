import React from "react"

export const Input = ({title, ...rest}) => (
    <>
        {title && <label htmlFor={rest.id}>{title}</label>}
        <input {...rest} />
    </>
)