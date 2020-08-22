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

export const login = async (dispatch, id, password) => {
    try {
        const response = await firestore.auth.signInWithEmailAndPassword(id, password)
        dispatch({type: "LOGIN_SUCCESS", payload: getLoginSuccessState(response)})
    } catch (e) {
        dispatch({type: "LOGIN_FAILURE", payload: getLoginFailureState(e)}) 
    }
}
