import React from 'react'
import { WeatherPreview } from './WeatherPreview'

export function WeatherList({ days, isShowingC }) {

  return (
    <div className="weather-list container flex">
      {
        days.DailyForecasts.map((day, idx) => <WeatherPreview key={idx} day={day} isShowingC={isShowingC} />)
      }
    </div>
  )
}