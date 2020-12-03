import axios from 'axios'

export const locationService = {
  getLocation
}

const resolveData = res => res.data

// function getLocation() {
//   return axios.get('https://ip-api.com/json')
//     .then(resolveData)
// }

// function getLocation() {
//   return axios.get('https://geolocation-db.com/json/7733a990-ebd4-11ea-b9a6-2955706ddbf3')
//     .then(resolveData)
// }

function getLocation() {
  return axios.get('https://ipapi.co/json/')
    .then(resolveData)
}