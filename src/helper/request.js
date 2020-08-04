import axios from "axios"

// eslint-disable-next-line no-undef
const base_url = process.env.API_ROOT

export const request = (method, endpoint, param) => {
    let res = {}
    switch (method) {
        case "GET":
            res = axios.get(base_url + endpoint)
            break
        case "POST":
            res = axios.post(base_url + endpoint, param)
            break
        case "PUT":
            res = axios.put(base_url + endpoint, param)
            break
        case "DELETE":
            res = ""
            break
    }
    return res
}