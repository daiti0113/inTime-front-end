import {firestore} from "./firebase"

const getLoginSuccessState = res => ({
    loggedIn: true,
    name: res.user.displayName,
    email: res.user.email,
    uid: res.user.uid
})

const getLoginFailureState = res => ({
    errorCode: res.code,
    errorMessage: res.message
})

export const login = async (e, dispatch, id, password, navigate) => {
    try {
        e.preventDefault()
        const response = await firestore.auth.signInWithEmailAndPassword(id, password)
        dispatch({type: "LOGIN_SUCCESS", payload: getLoginSuccessState(response)})
        navigate("/")
    } catch (e) {
        dispatch({type: "LOGIN_FAILURE", payload: getLoginFailureState(e)}) 
    }
}
