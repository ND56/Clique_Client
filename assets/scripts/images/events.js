'use strict'

const ui = require('./ui')

const imagesHandlers = function () {
  $('#add-tag-btn').on('click', ui.addTag)
}

module.exports = {
  imagesHandlers
}
