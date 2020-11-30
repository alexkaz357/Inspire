import React, { useEffect, useRef, useState } from 'react'
import { MoreDetails } from '../cmps/MoreDetails'
import { Quotes } from '../cmps/Quotes'
import { GreetTimeLocation } from '../cmps/GreetTimeLocation'
import { quoteService } from '../services/quote-service'
import { MoreLessBtn } from '../cmps/MoreLessBtn'
import { weatherService } from '../services/weather-service'
import { DaysCount } from '../cmps/DaysCount'
import { Background } from '../cmps/Background'
import { Modal } from '../cmps/Modal'
import { eventBus } from '../services/event-bus-service'
import { userService } from '../services/user-service'
import { savePrefs } from '../store/actions/userActions'
import { useDispatch } from 'react-redux'

export function Home() {

  const [quotes, setQuotes] = useState(null)
  const [quote, setQuote] = useState(null)
  const [isSeeMore, setIsSeeMore] = useState(false)
  const [days, setWeather] = useState()
  const [preventApiRequests, setPreventApiRequests] = useState(false)

  const [refresh, setRefresh] = useState(false)

  const isShown = userService.getModalState()

  const dispatch = useDispatch();

  const interval = useRef(null)

  useEffect(() => {

    dispatch(savePrefs(userService.loadUserPrefs()))

    quoteService.getQuotes()
      .then(quotes => {
        setQuotes(quotes)
        setQuote(quotes[getRandomIntInclusive(0, quotes.length - 1)])
      })

    weatherService.getWeather()
      .then(weather => {
        setWeather(weather)
      })

    eventBus.on('showContent', () => {
      setRefresh(true)
    })

    interval.current = setInterval(() => { updateWeather() }, 1000 * 60);
    return () => {
      clearInterval(interval.current)
    }

    // eslint-disable-next-line
  }, [])

  function updateWeather() {
    const hours = new Date().getHours()
    if (hours === 0 && !preventApiRequests) {
      weatherService.getWeather()
        .then(weather => {
          setWeather(weather)
        })
      setPreventApiRequests(true)
    }
    else if (hours === 1) setPreventApiRequests(false)
  }

  function getNewQuote() {
    setQuote(quotes[getRandomIntInclusive(0, quotes.length - 1)])
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function seeMore() {
    setIsSeeMore(!isSeeMore)
  }

  if (!quote) return null

  return (
    <div className="home">

      <Background />

      <Modal />

      <div className="container">

        {
          !isShown && <div className={`content ${isSeeMore ? 'up' : 'down'}`}>


            <Quotes quote={quote} getNewQuote={getNewQuote} />

            <DaysCount />

            <GreetTimeLocation />

            <MoreLessBtn isSeeMore={isSeeMore} seeMore={seeMore} />

          </div>
        }

      </div>

      <MoreDetails isSeeMore={isSeeMore} days={days} />

    </div>
  )
}