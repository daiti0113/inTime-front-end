import React, {useContext} from "react"
import {Navigate, Routes, Route, BrowserRouter} from "react-router-dom"
import {userStore} from "./stores/userStore"
import {Login} from "./components/Login"
import {Top} from "./components/Top"
import {Signup} from "./components/Signup"

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

const AuthRoute = () => (
    <Routes>
        <Route path="/" element={<Top />} />
    </Routes>
)
