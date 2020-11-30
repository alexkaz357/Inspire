import React from 'react'
import moment from 'moment'

export function Days() {
  return (
    <div className="days container flex">
        <div>
          <p className="header">WEEKDAY</p>
          <p>{moment().format('dddd')}</p>
        </div>
        <div>
          <p className="header">MONTH</p>
          <p>{moment().format('MMMM')}</p>
        </div>
        <div>
          <p className="header">WEEK NUMER</p>
          <p>{moment().week()}</p>
        </div>
        <div>
          <p className="header">DAY OF THE YEAR</p>
          <p>{moment().dayOfYear()}</p>
        </div>
    </div>
  )
}