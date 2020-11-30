export const userService = {
  getModalState,
  removeModal,
  saveUserPrefs,
  loadUserPrefs,
  clearUserPrefs,
  updateUnits,
  saveImgNum,
  loadImgNum
}

const userPrefs = {}

function getModalState() {
  let modalState = loadFromStorage('modalState')
  if(modalState !== false) modalState = true
  return modalState
}

function removeModal() {
  saveToStorage('modalState', false)
}

function saveUserPrefs(prefs) {
  saveToStorage('userPrefs', prefs)
}

function loadUserPrefs() {
  let prefs = loadFromStorage('userPrefs')
  if(!prefs) prefs = userPrefs
  return prefs
}

function clearUserPrefs() {
  localStorage.removeItem('userPrefs', userPrefs)
}

function updateUnits() {
  let prefs = loadFromStorage('userPrefs')
  if(!prefs) prefs = {isF: false}
  let units = prefs.isF
  let newPrefs = {...prefs, isF: !units}
  saveToStorage('userPrefs', newPrefs)
}

function saveImgNum(imgNum) {
  saveToStorage('imgNum', imgNum)
}

function loadImgNum() {
  let imgNum = loadFromStorage('imgNum')
  if(!imgNum) imgNum = 1
  return imgNum
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}