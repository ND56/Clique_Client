'use strict'

const events = require('./user/events')

$(() => {
  // $('#login').hide()
  // $('#auth-view').hide()
  $('#sign-up').hide()
  $('#carousel-view').hide()

  $('#my-images-li').on('click', events.onSelectViewMyImagesView)
  $('#upload-image-li').on('click', events.onSelectUploadImagesView)
  $('#edit-pwd-li').on('click', events.onToggleEditPwdModal)
  $('#change-pw-form').on('submit', events.onEditPassword)
  $('#sign-out-li').on('click', events.onLogOut)
  $('#login-form').on('submit', events.onSignIn)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-up-toggle').on('click', events.onToggleSignUp)
  $('#sign-in-toggle').on('click', events.onToggleSignIn)
})
