import React, { useEffect, useState } from 'react'
import { locationService } from '../services/location-service'

export function Location() {

  const [location, setLocation] = useState(null)

  useEffect(() => {
    locationService.getLocation()
      .then(location => {
        setLocation(location)
      })
  }, [])

  if (!location) return 'Loading'

  return (
    <div className="location">
      <p>IN {location.city}, {location.country_name}</p>
    </div>
  )
}