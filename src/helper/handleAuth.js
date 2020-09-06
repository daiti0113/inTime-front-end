import {firestore} from "./firebase"

// eslint-disable-next-line no-undef
const APP_ROOT = process.env.APP_ROOT

const getLoginSuccessState = res => ({
    loggedIn: true,
    name: res.user.displayName,
    email: res.user.email,
    uid: res.user.uid
})

const getFailureState = res => ({
    errorCode: res.code,
    errorMessage: res.message
})

const actionCodeSettings = {
    url: `${APP_ROOT}/verifyMailLink`,
    handleCodeInApp: true
}
console.log(`${APP_ROOT}/verifyMailLink`)

export const sendEmailLink = async (e, dispatch, email) => {
    try {
        await firestore.auth.sendSignInLinkToEmail(email, actionCodeSettings)
        console.log("Mail Send")
        window.localStorage.setItem("emailForSignIn", email)
    } catch (e) {
        console.log(e)
        dispatch({type: "LOGIN_FAILURE", payload: getFailureState(e)}) 
    }
}

export const loginWithEmailLink = async (dispatch, navigate) => {
    try {
        const email = window.localStorage.getItem("emailForSignIn")
        const result = firestore.auth.isSignInWithEmailLink(window.location.href) ? await firestore.auth.signInWithEmailLink(email, window.location.href) : false
        console.log(email, window.location.href, result)
        window.localStorage.removeItem("emailForSignIn")
        result && dispatch({type: "LOGIN_SUCCESS", payload: getLoginSuccessState(result)})
        navigate("/")
    } catch (e) {
        console.log(e)
        navigate("/login")
        dispatch({type: "LOGIN_FAILURE", payload: getFailureState(e)}) 
    }
}

export const signup = async (e, dispatch, email, password, navigate) => {
    try {
        await firestore.auth.createUserWithEmailAndPassword(email, password)
        navigate("/login")
    } catch (e) {
        dispatch({type: "SIGNUP_FAILURE", payload: getFailureState(e)}) 
    }
}