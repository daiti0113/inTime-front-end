import {firestore} from "./firebase"

// eslint-disable-next-line max-lines-per-function
export const request = async (method, endpoint, params={uid: ""}) => {
    const collection = firestore.db.collection("users").doc(params.uid).collection(endpoint)
    console.log(collection)
    let res = []
    switch (method) {
        case "GET":
            // eslint-disable-next-line no-case-declarations
            const querySnapshot = await collection.get()
            querySnapshot.forEach(doc => res.push({...doc.data(), id: doc.id}))
            break
        case "POST":
            // eslint-disable-next-line no-case-declarations
            const doc = await collection.add(params)
            res = {...params, id: doc.id}
            break
        case "PUT":
            await collection.doc(params.id).set(params, {merge: true})
            res = params
            break
        case "DELETE":
            await collection.doc(params).delete()
            res = params
            break
    }
    return res
}