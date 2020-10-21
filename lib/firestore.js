import { initializeApp, firestore } from 'firebase'
require('dotenv').config()

const apiKey = process.env.FIREBASE_API_KEY
const authDomain = process.env.FIREBASE_AUTH_DOMAIN
const projectID = process.env.FIREBASE_PROJECT_ID

initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectID,
})

const db = firestore()

const writeDocument = ({ collection, identifier, document }) => {
  db.collection(collection)
    .doc(identifier)
    .set(document)
    .then(() => {
      console.log('Document successfully written!')
    })
    .catch((error) => {
      console.error('Error writing document: ', error)
    })
}

export default {
  writeDocument,
}
