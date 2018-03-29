const store = require('../store')
const apiUrl = require('../config')


const uploadImage = function (data) {
  return $.ajax({
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
      // Upload progress
      xhr.upload.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
        let percentComplete = evt.loaded / evt.total;
        //Do something with upload progress
        console.log(percentComplete);
        }
      }, false);
      return xhr;
    },
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
