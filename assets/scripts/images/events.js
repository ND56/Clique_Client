'use strict'

const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const getExifData = require('../../../lib/get-exif-data')
const store = require('../store')

const imagesHandlers = function () {
  $('#add-tag-btn').on('click', ui.addTag)
  $('#image-upload-form').on('submit', onUploadImage)
  $('#upload-btn').on('change', getExifData)
}

const onUploadImage = function (event) {
  console.log(event.target)
  event.preventDefault()
  const formData = new FormData(event.target)
  const imageDetails = getFormFields(document.forms.namedItem('image-details'))
  formData.append('image[title]', imageDetails.image.title)
  formData.append('image[description]', imageDetails.image.description)
  // formData.append('image[tags]', imageDetails.image.tags)
  formData.append('image[longitude]', store.exifData.longitude)
  formData.append('image[latitude]', store.exifData.latitude)
  formData.append('image[city]', store.exifData.city)
  formData.append('image[state]', store.exifData.state)
  formData.append('image[country]', store.exifData.country)

  api.uploadImage(formData)
    .then(ui.onUploadImageSuccess)
    .catch(ui.onUploadImageError)
}

module.exports = {
  imagesHandlers
}
