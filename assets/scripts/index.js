'use strict'

const events = require('./user/events')

$(() => {
  // $('#login').hide()
  $('#sign-up').hide()
  // $('#auth-view').hide()
  $('#carousel-view').hide()

  $('#my-images-li').on('click', events.onViewMyImages)
  $('#upload-image-li').on('click', events.onUploadImage)
  $('#edit-pwd-li').on('click', events.onEditPassword)
  $('#sign-out-li').on('click', events.onLogOut)
  $('#login-form').on('submit', events.onSignIn)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-up-toggle').on('click', events.onToggleSignUp)
  $('#sign-in-toggle').on('click', events.onToggleSignIn)
})
