import React from 'react'

export function MoreLessBtn({ isSeeMore, seeMore }) {
  return (
    <div className="more-less-btn flex" onClick={seeMore}>
      <p className="more-less">{isSeeMore ? 'LESS' : 'MORE'}</p>
      <p className="arrow"><i className={`fas fa-angle-${isSeeMore ? 'down' : 'up'}`}></i></p>
    </div>
  )
}
