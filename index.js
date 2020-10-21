const firestore = require('./lib/firestore')
const fraport = require('./lib/fraport')
const cron = require('node-cron')

cron.schedule('* * * * *', async () => {
  const arrivals = await fraport.getFlights('arrival')
  arrivals.forEach((arrival) => {
    firestore.writeDocument({
      collection: 'arrivals',
      identifier: arrival.flight.id,
      document: arrival.flight,
    })
  })

  const departures = await fraport.getFlights('departure')
  departures.forEach((departure) => {
    firestore.writeDocument({
      collection: 'departures',
      identifier: departure.flight.id,
      document: departure.flight,
    })
  })
})
