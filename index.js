
import React from "react"
import ReactDOM from "react-dom"
import {Header} from "./src/components/Header"
import {Input} from "./src/components/Input"

const App = () => {
    return (
        <>
            <Header />
            <Input />
        </>
    )
}

ReactDOM.render(<App />, document.querySelector("#app"))