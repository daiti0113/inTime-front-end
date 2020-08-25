import {firestore} from "./firebase"

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

export const login = async (e, dispatch, email, password, navigate) => {
    try {
        e.preventDefault()
        const response = await firestore.auth.signInWithEmailAndPassword(email, password)
        dispatch({type: "LOGIN_SUCCESS", payload: getLoginSuccessState(response)})
        navigate("/")
    } catch (e) {
        dispatch({type: "LOGIN_FAILURE", payload: getFailureState(e)}) 
    }
}

export const signup = async (e, dispatch, email, password, navigate) => {
    try {
        e.preventDefault()
        await firestore.auth.createUserWithEmailAndPassword(email, password)
        navigate("/login")
    } catch (e) {
        dispatch({type: "SIGNUP_FAILURE", payload: getFailureState(e)}) 
    }
}