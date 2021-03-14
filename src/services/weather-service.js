import axios from 'axios'

import { locationService } from './location-service'

export const weatherService = {
  getWeather
}

const API_KEY='FlOJUbbCEJZEONxsV2wo2Qp0dUoV1Uy6'

const resolveData = res => res.data

async function getWeather() {
  const cityKey = await getCityKey()
  return axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey[0].Key}?apikey=${API_KEY}&metric=true`)
    .then(resolveData)
}

async function getCityKey() {
  let city = await locationService.getLocation()
    .then(info => info.city)

    if (city === 'Petaẖ Tiqwa') city = 'tel aviv'

  return await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`)
    .then(resolveData)
}