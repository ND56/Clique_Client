'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-details').append('<input type="text" class="image-details-input" name="image[tags][]" placeholder="#tag">')
  tagCounter++
}

const onUploadImageSuccess = function(data) {
  console.log('worked')
}

const onUploadImageError = function( jqXHR, textStatus, errorThrown) {
  console.log(jqXHR)
}

module.exports = {
  addTag,
  onUploadImageSuccess,
  onUploadImageError
}
