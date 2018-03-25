const notification = require('../../../lib/notifications')
const store = require('../store.js')

const onSignInSuccess = function (apiResponse) {
  // storing API response (i.e., user object) to have quick access to
  // things like user._id, user.email, user.token, etc.
  store.user = apiResponse.user
  // end
  notification('success', 'Successfully Signed In')
  // change placeholder in dropdown label to user email
  $('#user-email-dropdown').text(store.user.email)
  // end
  $('#auth-view').hide()
  $('#carousel-view').show()
  // clearing sign in form on sign in success
  $('#login-form').each(function () {
    this.reset()
  })
  // end
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
  // end
}

const onSignUpFailure = function () {
  notification('danger', 'Sign Up Unsuccessful')
}

const onLogOutSuccess = () => {
  $('#carousel-view').hide()
  $('#auth-view').show()
  notification('success', 'Successfully Logged Out')
  // end
}

const onLogOutFailure = () => {
  notification('danger', 'Log-Out Unsuccessful')
}

const onChangePwdSuccess = () => {
  $('#change-pw-modal').modal('hide')
  // clearing change pwd form on success
  $('#change-pw-form').each(function () {
    this.reset()
  })
  // end
  notification('success', 'Password Successfully Changed')
}

const onChangePwdFailure = () => {
  notification('danger', 'Failed to Edit Password')
}

module.exports = {
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onLogOutSuccess,
  onLogOutFailure,
  onChangePwdSuccess,
  onChangePwdFailure
}
