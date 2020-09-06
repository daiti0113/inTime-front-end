
import React from "react"
import ReactDOM from "react-dom"
import {createUseStyles} from "react-jss"
import "@babel/polyfill"
import {UserProvider} from "./src/stores/userStore"
import {Router} from "./src/route"

const useStyles = createUseStyles({
    app: {
        display: "grid",
        padding: "0 5px",
        height: "100%"
    }
})

const App = () => {
    const classes = useStyles()

    return (
        <div className={classes.app}>
            <UserProvider >
                <Router />
            </UserProvider>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#app"))