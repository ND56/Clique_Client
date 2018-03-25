const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

// const authHandlers = function () {
//   $('#login').on('submit', onSignIn)
//   $('#sign-up-toggle').on('click', onToggleSignUp)
// }

const onToggleSignUp = (event) => {
  event.preventDefault()
  $('#login').hide()
  $('#sign-up').show()
}

const onToggleSignIn = (event) => {
  event.preventDefault()
  $('#sign-up').hide()
  $('#login').show()
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignUp = (event) => {
  event.preventDefault()
  const packagedSignUpData = getFormFields(event.target)
  console.log(packagedSignUpData)
  api.signUp(packagedSignUpData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onLogOut = (event) => {
  event.preventDefault()
  console.log('Log Out button works!')
  console.log(store.user.token)
  api.logOut()
    .then(ui.onLogOutSuccess)
    .catch(ui.onLogOutFailure)
}

const onEditPassword = (event) => {
  event.preventDefault()
  console.log('Edit Password button works!')
  $('#change-pw-modal').modal('show')
}

const onUploadImage = (event) => {
  event.preventDefault()
  console.log('Upload Image button works!')
}

const onViewMyImages = (event) => {
  event.preventDefault()
  console.log('My Images button works!')
}

module.exports = {
  onSignIn,
  onToggleSignUp,
  onToggleSignIn,
  onSignUp,
  onLogOut,
  onEditPassword,
  onUploadImage,
  onViewMyImages
}
