'use strict'

const events = require('./user/events')
const imagesEvents = require('./images/events')
const Dropzone = require('../../lib/dropzone')
const apiUrl = require('./config')
const getFormFields = require('../../lib/get-form-fields')
const store = require('./store')

$(() => {
  // $('#login').hide()
  // $('#auth-view').hide()
  // $('#sign-up').hide()
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
  imagesEvents.imagesHandlers()

  // previews is the HTML for the thumbnail that's built when a file is drag/dropped into the dropzone window
  const previews = "<div class='row'><div class='col-md-2 dz-filename'><span data-dz-name></span></div><div class='col-md-2 dz-size' data-dz-size></div><div class='col-md-2'><div class='progress'><div class='progress-bar progress-bar-striped active dz-upload' data-dz-uploadprogress role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'></div></div></div><div class='col-md-3 status'></div><div class='col-md-3 file-type'></div></div>"

  const dropzone = new Dropzone('#image-uploader', {
    url: apiUrl + '/images',
    paramName: 'image[file]',
    previewTemplate: previews,
    // headers: {
    //   'Authorization': 'Token=' + "Lqg5a0fkMsHpNFxeheB6r1n7TxM6t+XDAC16GlRP+Vo=--lNLxlGuG6MBfgF2YJ7iF8XGBdF6U4HuCUZQ5wgurfhI="
    // }
  })
  dropzone.on('sending', function (file, xhr, formData) {
    const title = $('#image-title').val()
    const description = $('#image-description').val()
    const test = document.forms.namedItem('image-details')
    const test2 = getFormFields(test)
    // console.log(test)
    // console.log(test2)
    formData.append('image[title]', title, 'image[description]', description, test2, 'user_id', store.user._id)
    console.log(formData)
  })
  dropzone.on('success', function (file, response) {
    console.log('ransuccess')
    const previewElement = file.previewElement
    $(previewElement).find('div.progress').children().removeClass('progress-bar-striped').addClass('progress-bar-success').html('<span> 100% Complete </span>')
    $(previewElement).find('div.status').html('<span> Success </span>')
  })
  dropzone.on('error', function (file, errorMessage) {
    const previewElement = file.previewElement
    $(previewElement).find('div.progress').children().removeClass('progress-bar-striped').addClass('progress-bar-danger').css('width', '100%').html('<span> 0%</span>')
    $(previewElement).find('div.status').html('<span> Error </span>')
  })
  dropzone.on('complete', function (file) {
    $(file.previewElement).find('div.file-type').html(file.type)
  })

})
