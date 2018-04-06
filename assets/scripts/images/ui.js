'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-upload-form').append('<div class="image-details-group tag"><button class="remove-tag">Remove Tag</button><input type="text" class="image-details-input" name="image[tags][]" placeholder="#tag" required></div>')
  tagCounter++
}

const onUploadImageSuccess = function(data) {
  const previewImage = $('.upload-info').last().children().last().children().first().children()[0]
  const statusCol = $('.upload-info').last().children().last().children().last()
  $(statusCol).append('Success')
  $(previewImage).attr('src', data.image.url)
  const uploadForm = document.getElementById('image-upload-form')
  uploadForm.reset()
  $('.tag').remove()
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
