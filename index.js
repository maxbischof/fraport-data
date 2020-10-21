const firestore = require('./lib/firestore')
const fraport = require('./lib/fraport')

;(async () => {
  const arrivals = await fraport.getArrivals()

  arrivals.forEach((arrival) => {
    console.log(arrivals)
    firestore.writeDocument({
      collection: 'arrival',
      identifier: arrival.flight.id,
      document: arrival.flight,
    })
  })
})()
