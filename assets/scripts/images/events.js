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
  event.preventDefault()
  const file = $("input[type=file]").get(0).files[0]
  console.log(file)
  const imageRow = `
    <div class='row image-table-row'>
      <div class="col-md-2 image-table-col"><img src="https://i.imgur.com/Z48QqPW.jpg" class="thumbnail"></div>
      <div class="col-md-3 image-table-col">` + file.name + `</div>
      <div class="col-md-2 image-table-col">` + file.size + `</div>
      <div class="col-md-2 image-table-col">` + file.type + `</div>
      <div class="col-md-3 image-table-col"></div>
    </div>
  `
  $('.upload-info').append(imageRow)
  const formData = new FormData(event.target)
  const imageDetails = getFormFields(event.target)
  formData.append('image[longitude]', store.exifData.longitude)
  formData.append('image[latitude]', store.exifData.latitude)
  formData.append('image[city]', store.exifData.city)
  formData.append('image[state]', store.exifData.state)
  formData.append('image[country]', store.exifData.country)
  console.log(formData)
  api.uploadImage(formData)
    .then(ui.onUploadImageSuccess)
    .catch(ui.onUploadImageError)
}

module.exports = {
  imagesHandlers
}
