'use strict'

let tagCounter = 0
const addTag = function (event) {
  $('#image-details').append('<input type="text" class="form-control" name="image[tags][]" placeholder="#tag">')
  tagCounter++
}

module.exports = {
  addTag
}
