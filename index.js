const firestore = require('./lib/firestore')
const fraport = require('./lib/fraport')
const express = require('express');
const app = express();

app.get('/cron/getflights', (req, res) => {
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
});

const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Example app listening at http://${host}:${port}`);
});


  