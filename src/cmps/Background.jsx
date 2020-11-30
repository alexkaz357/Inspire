import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { userService } from '../services/user-service'

export function Background() {

  const [picNum, setPicNum] = useState(userService.loadImgNum())

  const hours = useSelector(state => state.userReducer.time.hours)

  function changeImg(num) {
    let newPicNum = picNum + num;
    if (newPicNum === 0) newPicNum = 10
    if (newPicNum === 11) newPicNum = 1
    setPicNum(newPicNum)
    userService.saveImgNum(newPicNum)
  }

  return (

    <div className="background" >

      <p className="left" onClick={() => changeImg(-1)}><i className="fas fa-angle-left"></i></p>

      <img src={require(`../assets/img/${(hours >= 18 || hours < 6) ? 'night' : 'day'}-${picNum}.jpg`).default} alt="" />

      <p className="right" onClick={() => changeImg(1)}><i className="fas fa-angle-right"></i></p>

    </div>

  )
}