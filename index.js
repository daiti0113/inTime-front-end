
import React from "react"
import ReactDOM from "react-dom"
import {Header} from "./src/components/Header"
import {Top} from "./src/components/Top"
import {createUseStyles} from "react-jss"
import "@babel/polyfill"

const useStyles = createUseStyles({
    app: {
        padding: 20
    }
})

const App = () => {
    const classes = useStyles()

    return (
        <div className={classes.app}>
            <Header />
            <Top />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#app"))