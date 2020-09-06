import React, {useContext} from "react"
import {Navigate, Routes, Route, BrowserRouter} from "react-router-dom"
import {userStore} from "./stores/userStore"
import {Login} from "./components/Login"
import {Top} from "./components/Top"
import {Signup} from "./components/Signup"
import {VerifyMailLink} from "./components/VerifyMailLink"

export const Router = () => {
    const {state: {user}} = useContext(userStore)

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
                <Route path="verifyMailLink" element={<VerifyMailLink />} />
                {user.loggedIn ? <AuthRoute /> : <Navigate to="login" replace />}
            </Routes>
        </BrowserRouter>
    )
}

const AuthRoute = () => <Route path="//*" element={<Top />} />
