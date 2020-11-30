import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import moment from 'moment';
import { eventBus } from '../services/event-bus-service.js'
import { userService } from '../services/user-service'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { Button, Switch, TextField } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import { savePrefs } from '../store/actions/userActions'

export function Form() {

  const [userPrefs, setUserPrefs] = useState({ name: '', birthdate: null, isF: false });
  const [isName, setIsName] = useState(false)
  const [isBirthdate, setIsBirthdate] = useState(false)

  const CHARACTER_LIMIT = 10;

  const dispatch = useDispatch();

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    if (!value) setIsName(true)
    else if (value) setIsName(false)
    setUserPrefs(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBirthdateChange = (date) => {
    if (!date) setIsBirthdate(true)
    else if (date) setIsBirthdate(false)
    setUserPrefs(prevState => ({
      ...prevState,
      birthdate: date
    }));
  };

  const handleUnitsChange = (e) => {
    const { name, checked } = e.target;
    setUserPrefs(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  function closeModalClearInputs() {
    setUserPrefs({ name: '', birthdate: null, isF: false })
    eventBus.emit('closeModal')
    userService.removeModal()
    eventBus.emit('showContent')
  }

  function saveUserPrefs(arg) {

    if (!arg) {
      closeModalClearInputs()
      return
    }

    let test = validateBirthdate(moment(userPrefs.birthdate).format('DD/MM/YYYY'))

    if (!userPrefs.name) setIsName(true)
    if (!userPrefs.birthdate) setIsBirthdate(true)
    if (!userPrefs.name || !userPrefs.birthdate || !test) return

    if (arg) {
      userPrefs.name = ' ' + userPrefs.name
      dispatch(savePrefs(userPrefs))
      closeModalClearInputs()
    }
  }

  function validateBirthdate(date) {
    const re = /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
    return re.test(String(date));
  }

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#4169e1'
      }
    },
    typography: {
      fontFamily: 'montserrat'
    }
  });

  return (
    <form className="form" noValidate autoComplete="off">

      <p className="header header-first">ENTER YOUR DETAILS</p>
      <p className="header header-second">AND ENJOY THE FULL EXPERIENCE</p>

      <MuiThemeProvider theme={theme}>

        <div className="form-field">
          <TextField
            id="first-name"
            name="name" label="First Name"
            style={{ width: 300 }}
            value={userPrefs.name}
            onChange={handleNameChange}
            inputProps={{
              maxLength: CHARACTER_LIMIT
            }}
            helperText={`${userPrefs.name.length}/${CHARACTER_LIMIT}`}
          />
          <p className={`required name-required ${isName ? '' : 'hide'}`}>This field is required</p>
        </div>

        <div className="form-field date-field">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              style={{ width: 300 }}
              id="birthdate"
              name="birthdate"
              label="Birthdate"
              format="dd/MM/yyyy"
              value={userPrefs.birthdate}
              onChange={handleBirthdateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
              maxDate={new Date()}
            />
          </MuiPickersUtilsProvider>
          <p className={`required birthdate-required ${isBirthdate ? '' : 'hide'}`}>This field is required</p>
        </div>

      </MuiThemeProvider>

      <div className="form-field">
        <p className="units">Preffered Units</p>
        <div className="degSwitch">
          <p className={`${userPrefs.isF ? '' : 'color'}`}>&deg;C</p>
          <Switch
            checked={userPrefs.isF}
            onChange={handleUnitsChange}
            color="default"
            name="isF"
          />
          <p className={`${userPrefs.isF ? 'color' : ''}`}>&deg;F</p>
        </div>
      </div>

      <div className="form-field btns">
        <Button variant="outlined" onClick={() => saveUserPrefs(true)}>OK</Button>
        <Button variant="outlined" onClick={() => saveUserPrefs(false)}>CANCEL</Button>
      </div>

    </form>
  )
}