'use strict'

const api = require('./user/api.js')

const getUserLocation = function (signInApiResponse) {
  return new Promise((resolve, reject) => {
    // Acquire user geolocation information
    navigator.geolocation.getCurrentPosition(position => {
      // Pass the geolocation information to a Clique API call to store that
      // information in the database (see api.js)
      api.updateUser(position.coords.latitude, position.coords.longitude, signInApiResponse)
        .then(updatedUser => {
          // pass the updated user object back to the sign-in promise chain
          resolve(updatedUser)
        })
    }, function errorCallback (error) {
      reject(error)
    }, { // this third object is optional and allows for a small amount of fine-
      // tuning with the geolocation API call.
      timeout: 8000, // sets geolocation API call to timeout after 8 seconds
      maximumAge: 8640000000 // allows subsequent geolocator requests to utilize
      // cached data for up to 24 hours (in miliseconds)
    })
  })
}

module.exports = {
  getUserLocation
}
