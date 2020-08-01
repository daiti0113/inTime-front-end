import {request} from "./request"

const pathToType = path => path.replace("/", "").toUpperCase()

export const fetchData = (useEffect, path, dispatch, trigger=[]) => {
    useEffect(()=> {
        const getRequest = async() => {
            const response = await request("GET", path)
            await dispatch({type: `FETCH_${pathToType(path)}`, payload: response.data})
        }
        getRequest()
    }, trigger)
}

export const updateData = (path, dispatch, payload) => {
    request("POST", path, payload)
    dispatch({type: `UPDATE_${pathToType(path)}`, payload: payload})
}