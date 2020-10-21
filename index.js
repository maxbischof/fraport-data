const firebase = require('firebase')
require('dotenv').config()

const apiKey = process.env.FIREBASE_API_KEY
const authDomain = process.env.FIREBASE_AUTH_DOMAIN
const projectID = process.env.FIREBASE_PROJECT_ID

firebase.initializeApp({
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectID,
})

const db = firebase.firestore()

const arrivalObject = {
  id: 22,
  start: '20.09.20',
}

db.collection('arrivals')
  .doc('23')
  .set(arrivalObject)
  .then(() => {
    console.log('Document successfully written!')
  })
  .catch((error) => {
    console.error('Error writing document: ', error)
  })
