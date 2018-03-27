'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-details').append('<input type="text" class="image-details-input" name="image[tags][]" placeholder="#tag">')
  tagCounter++
}

module.exports = {
  addTag
}
