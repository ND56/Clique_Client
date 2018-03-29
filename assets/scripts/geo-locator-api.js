'use strict'

const api = require('./user/api.js')

// will need to request information

// getting location

// const getUserLocation = function () {
//   navigator.geolocation.watchPosition(function (position) {
//     console.log(position.coords.latitude)
//     console.log(position.coords.longitude)
//   })
// navigator.geolocation.getCurrentPosition(function (position) {
//   const userLatitude = position.coords.latitude
//   const userLongitude = position.coords.longitude
//   console.log(userLatitude)
//   console.log(userLongitude)
//   console.log(navigator)
// }, function errorCallback (error) {
//   console.log(error.code)
//   console.log(error.message)
// })
// if ('geolocation' in navigator) {
//   console.log('location available')
//   console.log(navigator)
// } else {
//   console.log('location unavailable')
// }
// }

// const getUserLocation = function (signInApiResponse) {
//   return new Promise((resolve, reject) => {
//     navigator.geolocation.watchPosition(function (position) {
//       console.log(position.coords.latitude)
//       if (position.coords.latitude) {
//         // ui update position.coords.latitude
//         // ui update position.coords.longitude
//         api.updateUser(position.coords.latitude, position.coords.longitude, signInApiResponse)
//           .then(function (updateResponseObject) {
//             console.log(updateResponseObject)
//             return updateResponseObject
//           })
//           .then(resolve)
//       } else {
//         reject(Error)
//       }
//     })
//   })
// }

const getUserLocation = function (signInApiResponse) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position.coords.latitude)
      // ui update position.coords.latitude
      // ui update position.coords.longitude
      api.updateUser(position.coords.latitude, position.coords.longitude, signInApiResponse)
        .then(function (updateResponseObject) {
          console.log(updateResponseObject)
          return updateResponseObject
        })
        .then(resolve)
    }, function errorCallback (error) {
      console.log(error.code)
      console.log(error.message)
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
