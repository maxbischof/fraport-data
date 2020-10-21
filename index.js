import { writeDocument } from './lib/firestore'

const arrivalObject = {
  id: 22,
  start: '20.09.20',
}

writeDocument({
  collection: 'arrival',
  identifier: '20',
  document: arrivalObject,
})
