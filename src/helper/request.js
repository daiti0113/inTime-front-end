import {firestore} from "./firebase"

// eslint-disable-next-line max-lines-per-function
export const request = async (method, endpoint, params={uid: ""}) => {
    const {uid, ...requestParams} = params
    console.log(uid, requestParams)
    const collection = firestore.db.collection("users").doc(uid).collection(endpoint)
    let res = []
    switch (method) {
        case "GET":
            // eslint-disable-next-line no-case-declarations
            const querySnapshot = await collection.get()
            querySnapshot.forEach(doc => res.push({...doc.data(), id: doc.id}))
            break
        case "POST":
            // eslint-disable-next-line no-case-declarations
            const doc = await collection.add(requestParams)
            res = {...requestParams, id: doc.id}
            break
        case "PUT":
            await collection.doc(requestParams.id).set(requestParams, {merge: true})
            res = requestParams
            break
        case "DELETE":
            await collection.doc(requestParams.id).delete()
            res = requestParams
            break
    }
    return res
}