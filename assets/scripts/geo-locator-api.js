'use strict'

// will need to request information

// getting location

const getUserLocation = function () {
  navigator.geolocation.getCurrentPosition(function (position) {
    const userLatitude = position.coords.latitude
    const userLongitude = position.coords.longitude
    console.log(userLatitude)
    console.log(userLongitude)
  }, function errorCallback (error) {
    console.log(error.code)
    console.log(error.message)
  })
}

module.exports = {
  getUserLocation
}
