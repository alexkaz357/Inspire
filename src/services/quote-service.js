import axios from 'axios'

export const quoteService = {
  getQuotes
}

// const resolveData = res => res.data

// function getQuotes() {
//   return axios.get('https://type.fit/api/quotes')
//     .then(resolveData)
// }

async function getQuotes() {
  try {
    let res = await axios.get('https://type.fit/api/quotes')
    return res.data
  } catch (error) {
    console.log(error)
  }
}

// getQuotes = async () => {
//   try {
//     let res = await axios.get('https://type.fit/api/quotes')
//     return res.data
//   } catch (error) {
//     console.log(error)
//   }
// }