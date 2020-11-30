import React from 'react'
import { useSelector } from "react-redux";
import moment from 'moment';

export function WeatherPreview({ day, isShowingC }) {

  const hours = useSelector(state => state.userReducer.time.hours)

  const timeDiff = (hours >= 18 || hours < 6)

  function getIconUrl() {
    let iconNum = day[`${timeDiff ? 'Night' : 'Day'}`].Icon;
    if (iconNum < 10) iconNum = '0' + iconNum;
    return `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`
  }

  function showInF(val) {
    return val * 9 / 5 + 32
  }

  return (

    <div className="weather-card">

      <img src={getIconUrl()} alt="" />
      <h3>{moment(day.Date).format('ddd DD/MM/YY')}</h3>
      <p>{day[`${timeDiff ? 'Night' : 'Day'}`].IconPhrase}</p>
      <p className="temperature">{isShowingC ? day.Temperature[`${timeDiff ? 'Minimum' : 'Maximum'}`].Value : showInF(day.Temperature[`${timeDiff ? 'Minimum' : 'Maximum'}`].Value).toFixed(1)}&deg;{isShowingC ? 'C' : 'F'}</p>

    </div>
  )
}