import {auth} from "./firebase"

export const signin = async (dispatch, id, password) => {
    const response = await auth.signInWithEmailAndPassword(id, password)
    dispatch({type: "LOGIN_SUCCESS", payload: response})
}
