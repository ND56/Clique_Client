const apiUrl = require('../config')
const store = require('../store.js')

const signIn = function (data) {
  return $.ajax({
    url: apiUrl + '/sign-in',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const signUp = function (data) {
  return $.ajax({
    url: apiUrl + '/sign-up',
    method: 'POST',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const changePw = function (data) {
  return $.ajax({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      contentType: 'application/json'
    },
    data
  })
}

const logOut = () => {
  console.log('user ID is', store.user._id)
  console.log('user token is', store.user.token)
  return $.ajax({
    url: apiUrl + '/sign-out/' + store.user._id,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const changePassword = (editPwdData) => {
  return $.ajax({
    url: apiUrl + '/change-password/' + store.user._id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: editPwdData
  })
}

const getImages = () => {
  return $.ajax({
    url: apiUrl + '/images',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const findByDistance = () => {
  return $.ajax({
    url: apiUrl + '/findbydistance',
    // ?latitude=' + store.user.latitude + '?longitude=' + store.user.longitude,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteImage = () => {
  return $.ajax({
    url: apiUrl + '/images/' + store.currentImageID,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const findImageById = () => {
  return $.ajax({
    url: apiUrl + '/images/' + store.currentImageID,
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const editImage = (editImgData) => {
  return $.ajax({
    url: apiUrl + '/images/' + store.currentImageID,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data: editImgData
  })
}

const updateUser = (latitude, longitude, apiResponse) => {
  console.log('line 106 in API', latitude)
  console.log('line 107 in API', apiResponse)
  return $.ajax({
    url: apiUrl + '/user-location/' + apiResponse.user._id,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + apiResponse.user.token
    },
    data: {
      'user': {
        'latitude': latitude,
        'longitude': longitude
      }
    }
  })
}

module.exports = {
  signIn,
  signUp,
  changePw,
  logOut,
  changePassword,
  getImages,
  deleteImage,
  findImageById,
  editImage,
  updateUser,
  findByDistance
}
