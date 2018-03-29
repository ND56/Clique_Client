'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-upload-form').append('<input type="text" class="image-details-input" name="image[tags][]" placeholder="#tag" required>')
  tagCounter++
}

const onUploadImageSuccess = function(data) {
  const previewImage = $('.upload-info').last().children().last().children().first().children()[0]
  const statusCol = $('.upload-info').last().children().last().children().last()
  $(statusCol).append('Success')
  console.log(previewImage)
  console.log(data)
  $(previewImage).attr('src', data.image.url)
}

const onUploadImageError = function( jqXHR, textStatus, errorThrown) {
  const statusCol = $('.upload-info').last().children().last().children().last()
  $(statusCol).append('Error')
}

module.exports = {
  addTag,
  onUploadImageSuccess,
  onUploadImageError
}
