import {firestore} from "./firebase"

// eslint-disable-next-line max-lines-per-function
export const request = async (method, endpoint, param) => {
    const collection = firestore.db.collection(endpoint)
    let res = []
    switch (method) {
        case "GET":
            // eslint-disable-next-line no-case-declarations
            const querySnapshot = await collection.get()
            querySnapshot.forEach(doc => res.push(doc.data()))
            console.log(res)
            break
        case "POST":
            res = await collection.add(param)
            break
        case "PUT":
            break
        case "DELETE":
            break
    }
    return res
}