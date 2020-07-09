import React from "react"

export const Input = ({title, type, placeholder, id}) => (
    <>
        <label htmlFor={id}>{title}</label>
        <input type={type} placeholder={placeholder} id={id} />
    </>
)