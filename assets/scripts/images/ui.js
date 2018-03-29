'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-upload-form').append('<div class="image-details-group"><input type="text" class="image-details-input" name="image[tags][]" placeholder="#tag" required></div><br>')
  tagCounter++
}

const onUploadImageSuccess = function(data) {
  const previewImage = $('.upload-info').last().children().last().children().first().children()[0]
  const statusCol = $('.upload-info').last().children().last().children().last()
  $(statusCol).append('Success')
  console.log(previewImage)
  console.log(data)
  $(previewImage).attr('src', data.image.url)
  const uploadForm = document.getElementById('image-upload-form')
  uploadForm.reset()
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
