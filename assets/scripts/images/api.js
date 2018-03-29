const store = require('../store')
const apiUrl = require('../config')


const uploadImage = function (data) {
  return $.ajax({
    url: apiUrl + '/images',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data,
    processData: false,
    contentType: false
  })
}

module.exports = {
  uploadImage
}
