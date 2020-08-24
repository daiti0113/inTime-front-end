
import React from "react"
import ReactDOM from "react-dom"
import {Header} from "./src/components/Header"
import {createUseStyles} from "react-jss"
import "@babel/polyfill"
import {UserProvider} from "./src/stores/userStore"
import {Router} from "./src/route"

const useStyles = createUseStyles({
    app: {
        padding: "0 20px"
    }
})

const App = () => {
    const classes = useStyles()

    return (
        <div className={classes.app}>
            <UserProvider>
                <Header />
                <Router />
            </UserProvider>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector("#app"))