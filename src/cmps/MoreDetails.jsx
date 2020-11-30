import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { userService } from '../services/user-service';
import { changeUnits } from '../store/actions/userActions'
import { Days } from './Days'
import { WeatherList } from './WeatherList'

export function MoreDetails({ isSeeMore, days }) {

  const isShowingC = useSelector(state => !state.userReducer.userPrefs.isF) || !userService.loadUserPrefs().isF

  const dispatch = useDispatch();

  function changeDegShow() {
    dispatch(changeUnits())
  }

  if(!days) return 'Loading'

  return (
    <div className={`more-details ${isSeeMore ? 'more' : 'less'}`}>

      <WeatherList days={days} isShowingC={isShowingC} />

      <div className="message-show container flex space-between">
        <p className="message">{days.Headline.Text}</p>
        <p className="show" onClick={changeDegShow}>SHOW IN &deg;{isShowingC ? 'F' : 'C'}</p>
      </div>

      <Days />

    </div>
  )
}