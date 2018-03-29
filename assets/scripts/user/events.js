const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
const userLocator = require('../geo-locator-api')

// const authHandlers = function () {
//   $('#login').on('submit', onSignIn)
//   $('#sign-up-toggle').on('click', onToggleSignUp)
// }

const onToggleSignUp = (event) => {
  event.preventDefault()
  $('#login').hide()
  $('#sign-up').show()
}

const onToggleSignIn = (event) => {
  event.preventDefault()
  $('#sign-up').hide()
  $('#login').show()
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
  api.signIn(data)
    // passing geo-locator the apiResponse so it can use in its update user requests
    .then(function (signInApiResponse) {
      store.user = signInApiResponse.user
      return signInApiResponse
    })
    .then(signInApiResponse => userLocator.getUserLocation(signInApiResponse))
    // The geolocator updates user with lat/long and returns the sign-in apiResponse
    // if lat is truthy, continue the chain
    .then(function (geoResponse) {
      console.log('events line 34 geoResponse', geoResponse)
      return geoResponse
    })
    .then(function (updateApiResponse) {
      if (updateApiResponse.user.latitude) {
        ui.onSignInSuccess(updateApiResponse)
        api.getImages()
          .then(ui.populateCarouselSuccess)
          .catch(ui.populateCarouselFailure)
        store.view = 'carousel'
      } else {
        console.log('No geo tracking!')
        ui.noGeoTracking()
      }
    })
    .catch(function (error) {
      if (error.code === 3) {
        ui.timeOutMessage()
        ui.onSignInSuccess(store.user)
        api.getImages()
          .then(ui.populateCarouselSuccess)
          .catch(ui.populateCarouselFailure)
        store.view = 'carousel'
      } else {
        ui.onSignInFailure(error)
      }
    })
}

const onSignUp = (event) => {
  event.preventDefault()
  const packagedSignUpData = getFormFields(event.target)
  console.log(packagedSignUpData)
  api.signUp(packagedSignUpData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onLogOut = (event) => {
  event.preventDefault()
  console.log('Log Out button works!')
  console.log(store.user.token)
  api.logOut()
    .then(ui.onLogOutSuccess)
    .catch(ui.onLogOutFailure)
  // emptying my images view so it doesn't duplicate on return to my images
  $('#my-images-readout-wrapper').empty()
}

const onToggleEditPwdModal = (event) => {
  event.preventDefault()
  $('#change-pw-modal').modal('show')
}

const onEditPassword = (event) => {
  event.preventDefault()
  const packagedEditPwdData = getFormFields(event.target)
  api.changePassword(packagedEditPwdData)
    .then(ui.onChangePwdSuccess)
    .catch(ui.onChangePwdFailure)
}

const onSelectUploadImagesView = (event) => {
  event.preventDefault()
  ui.uploadImagesView()
  // emptying my images view so it doesn't duplicate on return to my images
  $('#my-images-readout-wrapper').empty()
}

const onSelectViewMyImagesView = (event) => {
  event.preventDefault()
  api.getImages()
    .then(ui.myImagesView)
    .catch(console.error)
}

const onReturnToCarouselView = (event) => {
  event.preventDefault()
  ui.returnToCarouselView()
  // emptying my images view so it doesn't duplicate on return to my images
  $('#my-images-readout-wrapper').empty()
}

const onDeleteImage = (event) => {
  event.preventDefault()
  // we set the "delete" data property of the delete button to image ID so we
  // could access it from the event and use to AJAX/DOM delete
  store.currentImageID = $(event.target).data().delete
  api.deleteImage()
    .then(ui.deleteImageSuccess)
    .catch(ui.deleteImageFailure)
}

const onSelectCarousel = (event) => {
  event.preventDefault()
  store.currentImageID = $(event.target).data().id
  $('#single-image-readout-modal').modal('show')
  api.findImageById()
    .then(ui.populateCarouselModalSuccess)
    .catch(ui.populateCarouselModalFailure)
}

const onToggleEditImageModal = (event) => {
  event.preventDefault()
  console.log('Button works!')
  store.currentImageID = $(event.target).data().edit
  api.findImageById()
    .then(ui.toggleEditImageModalSuccess)
    .catch(ui.toggleEditImageModalFailure)
}

const onEditImage = (event) => {
  event.preventDefault()
  // for some reason, I had to pass event.target.form; no idea why it's
  // different for this form than for other forms!
  const editImageData = getFormFields(event.target)
  store.recentEditedData = editImageData
  api.editImage(editImageData)
    .then(ui.editImageSuccess)
    .catch(ui.editImageFailure)
  // storing edited image data for immediate DOM manipulation
}

module.exports = {
  onSignIn,
  onToggleSignUp,
  onToggleSignIn,
  onSignUp,
  onLogOut,
  onToggleEditPwdModal,
  onSelectUploadImagesView,
  onSelectViewMyImagesView,
  onEditPassword,
  onReturnToCarouselView,
  onDeleteImage,
  onSelectCarousel,
  onToggleEditImageModal,
  onEditImage
}
