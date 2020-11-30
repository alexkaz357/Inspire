import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userService } from '../services/user-service';
import { setTime } from '../store/actions/userActions';
import { Location } from './Location'

export function GreetTimeLocation() {

  const [hours, setHours] = useState()
  const [mins, setMins] = useState()
  const [secs, setSecs] = useState()

  const interval = useRef(null)

  const dispatch = useDispatch();

  const name = useSelector(state => state.userReducer.userPrefs.name) || userService.loadUserPrefs().name

  useEffect(() => {
    getTimeStr()
    interval.current = setInterval(() => { getTimeStr() }, 1000);
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  function getTimeStr() {
    let stamp = new Date()
    let hours = stamp.getHours();
    let mins = stamp.getMinutes();
    let secs = stamp.getSeconds();
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;
    setHours(hours)
    setMins(mins)
    setSecs(secs)
    dispatch(setTime({ hours, mins, secs }))
  }

  function getTimeOfDay() {
    if (hours >= 6 && hours <= 11) return 'MORNING'
    else if (hours >= 12 && hours <= 17) return 'AFTERNOON'
    else if (hours >= 18 && hours <= 21) return 'EVENING'
    else return 'NIGHT'
  }

  return (
    <div className="greet-time-location">
      <div className="greet flex">
        <i className={`fas fa-sun ${hours >= 6 && hours <= 17 ? '' : 'hide'}`}></i>
        <i className={`fas fa-moon ${hours <= 5 || hours >= 18 ? '' : 'hide'}`}></i>
        <p className="greet-line">GOOD {getTimeOfDay()}{name}, IT'S CURRENTLY</p>
      </div>
      <div className="time flex">
        <p>{hours}:{mins}</p>
        <p className="secounds">{secs}</p>
      </div>
      <Location />
    </div>
  )
}