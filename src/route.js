import React, {useContext} from "react"
import {Navigate, Routes, Route, BrowserRouter} from "react-router-dom"
import {userStore} from "./stores/userStore"
import {Login} from "./components/Login"
import {Top} from "./components/Top"
import {Signup} from "./components/Signup"
import {Header} from "./components/Header"
import {createUseStyles} from "react-jss"

const useStyles = createUseStyles({
    container: {
        display: "grid",
        gridTemplateRows: "70px 1fr",
        rowGap: "20px"
    }
})

export const Router = () => {
    const {state: {user}} = useContext(userStore)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                {user.loggedIn ? <AuthRoute /> : <Navigate to="login" replace />}
            </Routes>
        </BrowserRouter>
    )
}

const AuthRoute = () => {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Header />
            <Route path="//*" element={<Top />} />
        </div>
    )
}
