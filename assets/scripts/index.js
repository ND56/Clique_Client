'use strict'

const events = require('./user/events')

$(() => {
  // $('#login').hide()
  $('#sign-up').hide()

  $('#login-form').on('submit', events.onSignIn)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-up-toggle').on('click', events.onToggleSignUp)
  $('#sign-in-toggle').on('click', events.onToggleSignIn)
})
