const firestore = require('./lib/firestore.js')
const fraport = require('./lib/fraport.js')

const arrivalObject = {
  id: 22,
  start: '20.09.20',
}

firestore.writeDocument({
  collection: 'arrival',
  identifier: '20',
  document: arrivalObject,
})

fraport.getArrivals()
