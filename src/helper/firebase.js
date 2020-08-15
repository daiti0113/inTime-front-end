import firebase from "firebase"

firebase.initializeApp({
    // eslint-disable-next-line no-undef
    apiKey: process.env.FIREBASE_API_KEY,
    // eslint-disable-next-line no-undef
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    // eslint-disable-next-line no-undef
    projectId: process.env.FIREBASE_PROJECT_ID
})

const auth = firebase.auth()
const db = firebase.firestore()

export const firestore = {auth, db}