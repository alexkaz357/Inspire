import axios from 'axios'

export const quoteService = {
  getQuotes
}

const resolveData = res => res.data

function getQuotes() {
  return axios.get('https://type.fit/api/quotes')
    .then(resolveData)
}