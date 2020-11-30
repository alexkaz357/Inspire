const initialState = {
  userPrefs: {},
  time: {}
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    
    case 'SET_USER_PREFS':
      return { ...state, userPrefs: action.userPrefs }
    
    case 'CLEAR_USER_PREFS':
      return { ...state, userPrefs: {} }
    
    case 'TOGGLE_UNITS':
      const userPrefsWithNewUnits = {...state.userPrefs, isF: !state.userPrefs.isF}
      return { ...state, userPrefs: userPrefsWithNewUnits }

      case 'SET_TIME':
        return { ...state, time: action.time }

    default:
      return state
  }
}