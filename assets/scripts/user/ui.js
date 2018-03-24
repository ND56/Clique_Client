const events = require('./events')
const notification = require('../../../lib/notifications')

const onSignInSuccess = function () {
  notification('success', 'Successfully Signed In')
  // hide landing Page
  // show carousel Page
}

const onSignInFailure = function () {
  notification('danger', 'Login Unsuccessful')
  // banner object appears
}

const onSignUpSuccess = function () {
  notification('success', 'Successfully Signed Up')
  // hide sign-updiv
  // show log-in div
  // banner object appears
}

const onSignUpFailure = function () {
console.log('error')
  notification('danger', 'Sign Up Unsuccessful')
  // banner object appears
}

module.exports = {
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure
}
