import axios from 'axios'

export const locationService = {
  getLocation
}

const resolveData = res => res.data

function getLocation() {
  return axios.get('http://ip-api.com/json')
    .then(resolveData)
}

// function getLocation() {
//   return axios.get('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
//     .then(resolveData)
// }
//     country_code: "IL",
//     country_name: "Israel",
//     city: "Tel Aviv",
//     postal: null,
//     latitude: 32.0678,
//     longitude: 34.7647,
//     IPv4: "46.116.176.12",
//     state: "Tel Aviv"