const axios = require('axios')
const https = require('https')
require('dotenv').config()

const authentificationKey = process.env.FRAPORT_API_KEY

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

const getFlights = async (type) => {
  return axiosInstance
    .get(
      'https://developer.fraport.de/api/flights/1.0/flight/FRA/' + type + '/',
      {
        headers: { Authorization: authentificationKey },
      }
    )
    .then((res) => {
      const flights = res.data.filter(
        (flight) => flight.flight[type] && flight.flight[type].actual
      )
      flights.forEach(
        (flight) =>
          (flight.flight.id =
            flight.flight[type].actual +
            flight.flight.flightNumber.airlineCode +
            flight.flight.flightNumber.trackNumber)
      )
      return flights
    })
    .catch((err) =>
      console.log('There was a problem loading flight data.' + err)
    )
}

module.exports = {
  getFlights,
}
