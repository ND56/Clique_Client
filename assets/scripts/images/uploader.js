'use strict'

const apiUrl = require('../config')
const getFormFields = require('../../../lib/get-form-fields')

const Dropzone = require('../../../lib/dropzone')
// previews is the HTML for the thumbnail that's built when a file is drag/dropped into the dropzone window
const previews = "<div class='row'><div class='col-md-2 dz-filename'><span data-dz-name></span></div><div class='col-md-2 dz-size' data-dz-size></div><div class='col-md-2'><div class='progress'><div class='progress-bar progress-bar-striped active dz-upload' data-dz-uploadprogress role='progressbar' aria-valuenow='0' aria-valuemin='0' aria-valuemax='100' style='width: 0%'></div></div></div><div class='col-md-3 status'></div><div class='col-md-3 file-type'></div></div>"

const dropzone = new Dropzone('#images-uploader', {
    url: apiUrl + '/uploader',
    paramName: 'image[file]',
    previewTemplate: previews
})
dropzone.on('sending', function (file, xhr, formData) {
  const title = $('#image-title').val()
  const description = $('#image-description').val()
  const test = getFormFields('#image-details')
  formData.append('image[title]', title, 'image[description]', description)
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

module.exports = dropzone
