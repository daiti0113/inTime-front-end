import {request} from "./request"

const pathToType = path => path.replace("/", "").toUpperCase()

export const fetchData = (useEffect, path, dispatch, payload={uid: ""}, trigger=[]) => {
    useEffect(() => {
        const getRequest = async () => {
            const response = await request("GET", path, payload)
            await dispatch({type: `FETCH_${pathToType(path)}`, payload: response})    
        }
        getRequest()
    }, trigger)
}

export const updateData = async (path, dispatch, payload={uid: ""}) => {
    const response = await request("PUT", path, payload)
    dispatch({type: `UPDATE_${pathToType(path)}`, payload: response})
}

export const createData = async (path, dispatch, payload={uid: ""}) => {
    const response = await request("POST", path, payload)
    dispatch({type: `CREATE_${pathToType(path)}`, payload: response})
}

// TODO: Change all payloads to objects (Ex.use "paylod.id" in request)
export const deleteData = async (path, dispatch, payload={uid: ""}) => {
    request("DELETE", path, payload)
    dispatch({type: `DELETE_${pathToType(path)}`, payload: payload})
}