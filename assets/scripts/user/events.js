const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store.js')
const userLocator = require('../geo-locator-api')

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

const onSignIn = (event) => {
  event.preventDefault()
  // show loader to user while sign-in executes
  $('#spinner').fadeIn()
  // create sign-in object from input fields for Clique API call
  const data = getFormFields(event.target)
  // start sign-in promise chain (see api.js)
  api.signIn(data)
    .then(signInApiResponse => {
      // store user information in store.js file for later DOM manipulation
      // due to potential async issues, this has to be an independent step
      store.user = signInApiResponse.user
      return signInApiResponse
    })
    // pass user sign-in data to geolocation API call (see geo-locator-api.js)
    .then(signInApiResponse => userLocator.getUserLocation(signInApiResponse))
    // geolocator code updates user lat/long and returns updated user object
    .then(updatedApiResponse => {
      // if lat is truthy (i.e., geolocation was successful), continue the chain
      if (updatedApiResponse.user.latitude) {
        // line 42 just manipulates the DOM to hide/show the appropriate view
        // and let the user know sign-in was successful; code not included for
        // brevity
        ui.onSignInSuccess(updatedApiResponse)
        // lines 47-49 make an index Clique API call for all images and then
        // populate the user carousel by compaing the updated user geolocation
        // information with image geolocation information; code not included for
        // brevity
        api.getImages()
          .then(ui.populateCarouselSuccess)
          .catch(ui.populateCarouselFailure)
        // updates the "view state" in store file for DOM manipulation purposes
        store.view = 'carousel'
      } else {
        // if users decline access to their geolocation, they are instructed
        // that the app requires access to this information; code not included
        // for brevity
        ui.noGeoTracking()
      }
    })
    .catch(function (error) {
      // Error code "3" means the geolocation API timed out; we wanted it to
      // eventually time out so users didn't sit and wait for too long to access
      // the app. When it times out, a user is allowed to log in and the
      // carousel is instead populated with images from around the world; code
      // not included for brevity
      if (error.code === 3) {
        ui.timeOutMessage()
        ui.onSignInSuccess(store.user)
        api.getImages()
          .then(ui.populateCarouselSuccess)
          .catch(ui.populateCarouselFailure)
        store.view = 'carousel'
      } else {
        // other errors result in a failed log-in notice to the user
        $('#spinner').hide()
        ui.onSignInFailure(error)
      }
    })
}

const onSignUp = (event) => {
  event.preventDefault()
  const packagedSignUpData = getFormFields(event.target)
  api.signUp(packagedSignUpData)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}

const onLogOut = (event) => {
  event.preventDefault()
  // hide spinner so it won't show on return to landing page
  $('#spinner').hide()
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
    .catch(ui.myImagesViewFailure)
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
  $('#comments-wrapper').empty()
  store.currentImageID = $(event.target).data().id
  $('#single-image-readout-modal').modal('show')
  api.findImageById()
    .then(ui.populateCarouselModalSuccess)
    .catch(ui.populateCarouselModalFailure)
}

const onToggleEditImageModal = (event) => {
  event.preventDefault()
  store.currentImageID = $(event.target).data().edit
  api.findImageById()
    .then(ui.toggleEditImageModalSuccess)
    .catch(ui.toggleEditImageModalFailure)
}

const onEditImage = (event) => {
  event.preventDefault()
  const editImageData = getFormFields(event.target)
  store.recentEditedData = editImageData
  api.editImage(editImageData)
    .then(ui.editImageSuccess)
    .catch(ui.editImageFailure)
}

const onAddComment = (event) => {
  event.preventDefault()
  const packagedData = getFormFields(event.target)
  // save for DOM manipulation
  store.mostRecentComment = packagedData.image.comments
  api.createComment(packagedData)
    .then(ui.addCommentSuccess)
    .catch(ui.addCommentFailure)
}

const onToggleEditComment = function (event) {
  event.preventDefault()
  $('#single-image-readout-modal').modal('hide')
  $('#edit-comment-modal').modal('show')
  const data = $(event.target).data()
  const id = $(event.target).val('id')
  const oldCommentText = data.id
  const oldCommentId = id[0].id
  store.commentId = oldCommentId
  ui.populateEditModal(oldCommentText, oldCommentId)
}

const onSubmitComment = function (event) {
  event.preventDefault()
  const newData = getFormFields(event.target)
  newData.image.commentId = store.commentId
  api.editComment(newData)
    .then(ui.editCommentSuccess)
    .catch(ui.editCommentFailure)
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
  onEditImage,
  onAddComment,
  onToggleEditComment,
  onSubmitComment
}
