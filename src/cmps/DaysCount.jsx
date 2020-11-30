import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { eventBus } from '../services/event-bus-service.js'
import moment from 'moment'

import { clearPrefs } from '../store/actions/userActions'
import { userService } from '../services/user-service.js';

export function DaysCount() {

  const birthdate = useSelector(state => state.userReducer.userPrefs.birthdate) || userService.loadUserPrefs().birthdate

  const [daysCount, setDaysCount] = useState()

  const interval = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    calcDays()
    interval.current = setInterval(() => { calcDays() }, 1000 * 60);
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  function calcDays() {
    const today = moment(new Date())
    const days = today.diff(moment(birthdate), 'days')
    const daysLeft = 36525 - days
    setDaysCount(daysLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }

  function openModal() {
    eventBus.emit('openModal')
  }

  function logout() {
    dispatch(clearPrefs())
  }

  return (
    <div className="days-count">

      {
        !birthdate && <p className="btn connect-btn" onClick={openModal}>CONNECT</p>
      }

      {
        birthdate &&
        <div>

          <p className="days-to-go">{daysCount} days to go</p>
          <small>(YES, WE BELIEVE YOU'LL MAKE IT TO THE AGE OF 100)</small>
          <p className="days-to-go">make every second count</p>

          <div className="btns">
            <p className="btn edit-btn" onClick={openModal}>EDIT</p>
            <p className="btn logout-btn" onClick={logout}>DISCONNECT</p>
          </div>

        </div>
      }

    </div>
  )
}