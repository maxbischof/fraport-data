const axios = require('axios')
const https = require('https')
require('dotenv').config()

const authentificationKey = process.env.FRAPORT_API_KEY

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

const getArrivals = async () => {
  return axiosInstance
    .get('https://developer.fraport.de/api/flights/1.0/flight/FRA/arrival/', {
      headers: { Authorization: authentificationKey },
    })
    .then((res) => {
      const arrivedFlights = res.data.filter(
        (flight) => flight.flight.arrival && flight.flight.arrival.actual
      )
      arrivedFlights.forEach(
        (flight) =>
          (flight.flight.id =
            flight.flight.arrival.scheduled +
            flight.flight.flightNumber.airlineCode +
            flight.flight.flightNumber.trackNumber)
      )
      return arrivedFlights
    })
    .catch((err) =>
      console.log('There was a problem loading flight data.' + err)
    )
}

module.exports = {
  getArrivals,
}
