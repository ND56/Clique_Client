const notification = require('../../../lib/notifications')

const onSignInSuccess = function () {
  notification('success', 'Successfully Signed In')
  $('#auth-view').hide()
  $('#carousel-view').show()
  // clearing sign in form on sign in success
  $('#login-form').each(function () {
    this.reset()
  })
}

const onSignInFailure = function () {
  notification('danger', 'Login Unsuccessful')
}

const onSignUpSuccess = function () {
  notification('success', 'Successfully Signed Up')
  $('#sign-up').hide()
  $('#login').show()
  // clearing sign up form on sign up success
  $('#sign-up-form').each(function () {
    this.reset()
  })
}

const onSignUpFailure = function () {
  notification('danger', 'Sign Up Unsuccessful')
}

module.exports = {
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure
}
