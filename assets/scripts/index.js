'use strict'

const events = require('./user/events')

$(() => {
  // $('#login').hide()
  // $('#auth-view').hide()
  $('#sign-up').hide()
  $('#carousel-view').hide()
  $('#static-nav').hide()
  $('#upload-images-page').hide()
  $('#my-images-page').hide()

  $('#edit-pwd-li').on('click', events.onToggleEditPwdModal)
  $('#change-pw-form').on('submit', events.onEditPassword)
  $('#sign-out-li').on('click', events.onLogOut)
  $('#login-form').on('submit', events.onSignIn)
  $('#sign-up-form').on('submit', events.onSignUp)
  $('#sign-up-toggle').on('click', events.onToggleSignUp)
  $('#sign-in-toggle').on('click', events.onToggleSignIn)

  $('body').on('click', '.delete-image-button', events.onDeleteImage)
  $('body').on('click', '#upload-image-li', events.onSelectUploadImagesView)
  $('body').on('click', '#carousel-li', events.onReturnToCarouselView)
  $('body').on('click', '#my-images-li', events.onSelectViewMyImagesView)
})
