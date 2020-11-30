import { userService } from '../../services/user-service'

export function savePrefs(userPrefs) {
  userService.saveUserPrefs(userPrefs)
  return dispatch => {
    dispatch({ type: 'SET_USER_PREFS', userPrefs })
  }
}

export function clearPrefs() {
  userService.clearUserPrefs()
  return dispatch => {
    dispatch({ type: 'CLEAR_USER_PREFS' })
  }
}

export function changeUnits() {
  userService.updateUnits()
  return dispatch => {
    dispatch({ type: 'TOGGLE_UNITS' })
  }
}

export function setTime(time) {
  return dispatch => {
    dispatch({ type: 'SET_TIME', time })
  }
}