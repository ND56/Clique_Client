const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')

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
    .then(ui.onSignInSuccess)
    .then()
    .catch(ui.onSignInFailure)
    .then(() => {
      api.getImages()
        .then(ui.populateCarouselSuccess)
        .catch(ui.populateCarouselFailure)
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
  store.currentCarouselId = $(event.target).data().id
  $('#single-image-readout-modal').modal('show')
  api.findImageById()
    .then(ui.populateCarouselModalSuccess)
    .catch(ui.populateCarouselModalFailure)
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
  onSelectCarousel
}
