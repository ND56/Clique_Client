'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-upload-form').append('<input type="text" class="image-details-input" name="image[tags][]" placeholder="#tag" required>')
  tagCounter++
}

const onUploadImageSuccess = function(data) {
  $('#status').append('Success')
}

const onUploadImageError = function( jqXHR, textStatus, errorThrown) {
  console.log(jqXHR)
  $('#status').append('Error')
}

module.exports = {
  addTag,
  onUploadImageSuccess,
  onUploadImageError
}
