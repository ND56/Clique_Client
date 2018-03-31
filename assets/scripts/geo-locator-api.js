'use strict'

const api = require('./user/api.js')

const getUserLocation = function (signInApiResponse) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      api.updateUser(position.coords.latitude, position.coords.longitude, signInApiResponse)
        .then(function (updateResponseObject) {
          return updateResponseObject
        })
        .then(resolve)
    }, function errorCallback (error) {
      reject(error)
    }, {
      timeout: 8000, // 8 seconds
      maximumAge: 8640000000
      // third param is an optional PositionObject that allows for a small
      // amount of fine-tuning. Here, we're allowing subsequent geolocator
      // requests to utilize cached data for up to 24 hours (in miliseconds).
    })
  })
}

module.exports = {
  getUserLocation
}
