import React, { useEffect, useState } from 'react'
import { userService } from '../services/user-service'
import { eventBus } from '../services/event-bus-service.js'
import { Form } from './Form.jsx'

export function Modal() {

  const initialModalState = userService.getModalState()

  const [isShown, setIsShown] = useState(initialModalState)


  useEffect(() => {
    eventBus.on('closeModal', () => {
      setIsShown(false)
    })
    eventBus.on('openModal', () => {
      setIsShown(true)
    })
    return () => {

    }
  }, [])

  return (
    <div className={`modal-wrapper ${isShown ? '' : 'hide'}`} >
      <div className="modal-content" onClick={(ev) => ev.stopPropagation()}>

        <Form />

      </div>
    </div>
  )
}