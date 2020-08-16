import {firestore} from "./firebase"

// eslint-disable-next-line max-lines-per-function
export const request = async (method, endpoint, param) => {
    const collection = firestore.db.collection(endpoint)
    let res = []
    switch (method) {
        case "GET":
            // eslint-disable-next-line no-case-declarations
            const querySnapshot = await collection.get()
            querySnapshot.forEach(doc => res.push({...doc.data(), id: doc.id}))
            break
        case "POST":
            // eslint-disable-next-line no-case-declarations
            const doc = await collection.add(param)
            res = {...param, id: doc.id}
            break
        case "PUT":
            await collection.doc(param.id).set(param, {merge: true})
            res = param
            break
        case "DELETE":
            await collection.doc(param).delete()
            res = param
            break
    }
    return res
}