import {request} from "./request"

export const fetchData = (useEffect, path, setState, trigger=[]) => {
    useEffect(()=> {
        const getRequest = async() => {
            const response = request("GET", path)
            await setState(response.data)
        }
        getRequest()
    }, trigger)
}