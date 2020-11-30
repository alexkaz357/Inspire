import React from 'react'

export function Quotes({ quote, getNewQuote }) {

  if(!quote.author) quote.author = 'Anonymous'

  return (
    <div className="quotes flex space-between">
      <div className="body">
        <p className="quote"><span>“</span>{quote.text}<span>”</span></p>
        <p className="author">{quote.author}</p>
      </div>
      <div className="new-quote">
        <i className="fas fa-sync-alt" onClick={getNewQuote}></i>
      </div>
    </div>
  )
}
