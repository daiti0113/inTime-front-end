import {request} from "./request"

export const fetchData = (useEffect, path, dispatch, trigger=[]) => {
    useEffect(()=> {
        const getRequest = async() => {
            const response = await request("GET", path)
            await dispatch({type: `FETCH_${path.replace("/", "").toUpperCase()}`, payload: response.data})
        }
        getRequest()
    }, trigger)
}