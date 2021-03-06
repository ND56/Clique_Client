const notification = require('../../../lib/notifications')
const store = require('../store.js')
const templateMyImages = require('../templates/my-images-readout.handlebars')
const templateCarouselFirstImage = require('../templates/carousel-readout-first-image.handlebars')
const templateCarousel = require('../templates/carousel-readout.handlebars')
const geolib = require('geolib')

const onSignInSuccess = function (apiResponse) {
  notification.staticToast('success', 'Success!', 'Successfully signed in!', '#1F888F')
  // change placeholder in dropdown label to user email
  $('#user-email-dropdown').text(store.user.email)
  // making sure appropriate views/nav options are active
  $('#footer').show()
  $('#auth-view').hide()
  $('#my-images-page').hide()
  $('#upload-images-page').hide()
  $('#carousel-view').show()
  $('#static-nav').show()
  // clearing sign in form on sign in success
  $('#login-form').each(function () {
    this.reset()
  })
  // storing view location to inform dom manipulation (e.g., nav button options)
  store.view = 'carousel'
}

const onSignInFailure = function (error) {
  $('#login-form').each(function () {
    this.reset()
  })
  if (error.code === 1) {
    // user rejects geo locator
    notification.staticToast('error', 'Sorry!', 'This app requires the use of location tracking. Please allow location tracking in order to proceed. If you already rejected our tracking request, you will need to reset that decision in your browser settings.', 'red')
  } else {
    // wrong password, etc.
    notification.alert('danger', 'Login Unsuccessful. Please make sure you used the correct password!')
  }
}

const onSignUpSuccess = function () {
  notification.alert('success', 'Successfully Signed Up')
  $('#sign-up').hide()
  $('#login').show()
  // clearing sign up form on sign up success
  $('#sign-up-form').each(function () {
    this.reset()
  })
}

const onSignUpFailure = function () {
  $('#sign-up-form').each(function () {
    this.reset()
  })
  notification.alert('danger', 'Sign Up Unsuccessful')
}

const onLogOutSuccess = () => {
  if (store.view === 'upload images') {
    $('#upload-images-page').hide()
    $('#carousel-li a').text('Upload Image')
    $('#carousel-li').prop('id', 'upload-image-li')
  }
  if (store.view === 'my images') {
    $('#my-images-page').hide()
    $('#carousel-li a').text('My Images')
    $('#carousel-li').prop('id', 'my-images-li')
  }
  if (store.view === 'carousel') {
    $('#carousel-view').hide()
  }
  notification.alert('success', 'Successfully Logged Out')
  $('#static-nav').hide()
  $('#footer').hide()
  $('#auth-view').show()
  $('#carousel-inner').empty()
  $('#carousel-view').hide()
  $('#upload-images-page').hide()
  $('#my-images-page').hide()
  $('#carousel-header').text('Your Community') // in case timeout changed it
}

const onLogOutFailure = (apiResponse) => {
  notification.alert('danger', 'Log-Out Unsuccessful')
}

const onChangePwdSuccess = () => {
  $('#change-pw-modal').modal('hide')
  // clearing change pwd form on success
  $('#change-pw-form').each(function () {
    this.reset()
  })
  notification.universalToast('success', 'Success!', 'Password successfully changed.')
}

const onChangePwdFailure = () => {
  $('#change-pw-modal').modal('hide')
  // clearing change pwd form on success
  $('#change-pw-form').each(function () {
    this.reset()
  })
  notification.universalToast('error', 'Error!', 'Failed to edit password. Make sure you\'re entering the correct password!')
}

const uploadImagesView = () => {
  if (store.view === 'carousel') {
    $('#carousel-view').hide()
    $('#upload-images-page').show()
    $('#upload-image-li a').text('Carousel')
    $('#upload-image-li').prop('id', 'carousel-li')
  }
  if (store.view === 'my images') {
    $('#my-images-page').hide()
    $('#upload-images-page').show()
    $('#upload-image-li a').text('My Images')
    $('#upload-image-li').prop('id', 'my-images-li')
  }
  store.view = 'upload images'
}

const myImagesView = (apiResponse) => {
  // updating nav bar - START
  if (store.view === 'carousel') {
    $('#carousel-view').hide()
    $('#my-images-page').show()
    $('#my-images-li a').text('Carousel')
    $('#my-images-li').prop('id', 'carousel-li')
  }
  if (store.view === 'upload images') {
    $('#upload-images-page').hide()
    $('#my-images-page').show()
    $('#my-images-li a').text('Upload Image')
    $('#my-images-li').prop('id', 'upload-image-li')
  }
  store.view = 'my images'
  // populate images - START
  // filtering API response for user-owned images
  const personalImagesArr = apiResponse.images.filter(function (image) {
    return image._owner.email === store.user.email
  })
  if (personalImagesArr.length === 0) {
    $('#my-images-readout-wrapper').append('<div class="no-images" id="no-images">You have no images!<br><br>Upload some images to share with your community!</div>')
  } else {
    // turn each tags array into a string for easy DOM reading
    for (let i = 0; i < personalImagesArr.length; i++) {
      personalImagesArr[i].tags = personalImagesArr[i].tags.join(' ')
    }
    // pass modified array with string for tags to handlebars
    const myImagesReadout = templateMyImages({ images: personalImagesArr })
    $('#my-images-readout-wrapper').append(myImagesReadout)
    // using jquery to add correct image to each handlebars element
    for (let i = 0; i < apiResponse.images.length; i++) {
      $("div[data-id='image-" + apiResponse.images[i]._id + "']").css('background-image', 'url(' + apiResponse.images[i].url + ')')
    }
    // populate images - END
  }
}

const populateCarouselSuccess = (apiResponse) => {
  // remove user-owned images from the apiRespose
  const publicImagesArr = apiResponse.images.filter(function (image) {
    return image._owner.email !== store.user.email
    // return image._owner.email === store.user.email
  })
  // filter array by distance
  const geoArr = publicImagesArr.filter(function (image) {
    const imageLatitude = image.latitude.toString()
    const imageLongitude = image.longitude.toString()
    const userLatitude = store.user.latitude.toString()
    const userLongitude = store.user.longitude.toString()
    image.distance = geolib.getDistance(
      {latitude: imageLatitude, longitude: imageLongitude},
      {latitude: userLatitude, longitude: userLongitude})
    return image.distance < 25000
  })
  if (geoArr.length === 0) {
    // pass the public array to handlebars
    // run first public image through this handlebars to set active status in carousel
    notification.staticToast('info', 'Empty Community!', 'Looks like no one in your community has uploaded an image. For now, here\'s a look at images from around the world!', '#1F888F')
    $('#carousel-header').text('Public Images')
    const carouselReadoutFirstImage = templateCarouselFirstImage({ image: publicImagesArr[0] })
    // remove first image from array
    publicImagesArr.splice(0, 1)
    // run subsequent public images through this handlebars so active status not set
    const carouselReadout = templateCarousel({ images: publicImagesArr })
    // append images to DOM
    $('#carousel-inner').append(carouselReadoutFirstImage)
    $('#carousel-inner').append(carouselReadout)
  } else {
    // pass the geoArr to handlebars
    // run first public image through this handlebars to set active status in carousel
    const carouselReadoutFirstImage = templateCarouselFirstImage({ image: geoArr[0] })
    // remove first image from array
    geoArr.splice(0, 1)
    // run subsequent public images through this handlebars so active status not set
    const carouselReadout = templateCarousel({ images: geoArr })
    // append images to DOM
    $('#carousel-inner').append(carouselReadoutFirstImage)
    $('#carousel-inner').append(carouselReadout)
  }
}

const populateCarouselFailure = () => {
  notification.universalToast('error', 'Error!', 'Failed to populate carousel!')
}

const returnToCarouselView = () => {
  if (store.view === 'upload images') {
    $('#upload-images-page').hide()
    $('#carousel-view').show()
    $('#carousel-li a').text('Upload Image')
    $('#carousel-li').prop('id', 'upload-image-li')
  }
  if (store.view === 'my images') {
    $('#my-images-page').hide()
    $('#carousel-view').show()
    $('#carousel-li a').text('My Images')
    $('#carousel-li').prop('id', 'my-images-li')
  }
  store.view = 'carousel'
}

const deleteImageSuccess = () => {
  notification.universalToast('success', 'Success!', 'Successfully deleted image!')
  $("div[data-id='wrapper-" + store.currentImageID + "']").hide()
}

const deleteImageFailure = () => {
  notification.universalToast('error', 'Error!', 'Failed to delete image!')
}

const populateCarouselModalSuccess = (apiResponse) => {
  $('#city').text(apiResponse.image.city)
  $('#state').text(apiResponse.image.state)
  $('#single-title').text(apiResponse.image.title)
  $('#single-image').css('background-image', 'url(' + apiResponse.image.url + ')')
  $('#single-description-span').text(apiResponse.image.description)
  $('#single-owned-value').text(apiResponse.image._owner.email)
  if (apiResponse.image.tags.length > 0) {
    $('#single-tag-value').text(apiResponse.image.tags)
  }
  // iterate out the comments
  for (let i = 0; i < apiResponse.image.comments.length; i++) {
    const newTableId = 'comment-div' + i
    const newCommentSpanId = 'comment-span' + i
    const newCommentorSpanId = 'commentor-span' + i
    const $clone = $('#comment-template').clone().show()
    $clone.attr('id', newTableId)
    $clone.appendTo('#comments-wrapper')
    $('#' + newTableId + ' #new-comment').attr('id', newCommentSpanId)
    $('#' + newTableId + ' #new-commentor').attr('id', newCommentorSpanId)
    $('#' + newCommentSpanId).text(apiResponse.image.comments[i][0])
    $('#' + newCommentorSpanId).text(apiResponse.image.comments[i][1])
    if (apiResponse.image.comments[i][1] === store.user.email) {
      $('#' + newTableId).append('<button class="btn btn-default edit-comment-button" data-id="' + apiResponse.image.comments[i][0] + '" id="' + apiResponse.image.comments[i][2] + '">Edit</button>')
    }
  }
}

const populateCarouselModalFailure = (apiResponse) => {
  notification.universalToast('error', 'Error!', 'Failed to populate modal!')
}

const toggleEditImageModalSuccess = (apiResponse) => {
  $('#edit-image-modal').modal('show')
  $('#title1').val(apiResponse.image.title)
  $('#description2').text(apiResponse.image.description)
  $('#tags1').val(apiResponse.image.tags.join(' '))
}

const toggleEditImageModalFailure = () => {
  notification.universalToast('error', 'Error!', 'Failed to load image!')
}

const editImageSuccess = () => {
  // reset modal and hide
  $('#edit-image-form').each(function () {
    this.reset()
  })
  $('#edit-image-modal').modal('hide')
  // manipulate DOM
  $("span[data-id='title-" + store.currentImageID + "']").text(store.recentEditedData.image.title)
  $("span[data-id='description-" + store.currentImageID + "']").text(store.recentEditedData.image.description)
  $("span[data-id='tags-" + store.currentImageID + "']").text(store.recentEditedData.image.tags)
}

const editImageFailure = () => {
  notification.universalToast('error', 'Error!', 'Failed to edit image!')
}

const noGeoTracking = () => {
  notification.staticToast('error', 'Sorry!', 'This app requires the use of location tracking. Please allow location tracking in order to proceed. If you already rejected our tracking request, you will need to reset that decision in your browser settings.', 'red')
}

const timeOutMessage = () => {
  notification.staticToast('info', 'Location Tracker Timed-Out!', 'Geolocation was taking too long. To avoid excessive wait times, we\'re populating your carousel with images from around the world (instead of your local community).', '#1F888F')
  $('#carousel-header').text('Public Images')
}

const addCommentSuccess = (apiResponse) => {
  const commentsArrLength = apiResponse.image.comments.length
  const index = commentsArrLength - 1
  $('#submit-comment-form').each(function () {
    this.reset()
  })
  $('#comments-wrapper').prepend('<div class="sample-comment" id="comment-template"><span id="new-comment">' + store.mostRecentComment + '</span><br /><span class="commentor-1">-</span><span class="commentor-1" id="new-commentor">' + store.user.email + '</span></div>')
  $('#comment-template').append('<button class="btn btn-default edit-comment-button" data-id="' + apiResponse.image.comments[index][0] + '" id="' + apiResponse.image.comments[index][2] + '">Edit</button>')
}

const addCommentFailure = () => {
  notification.universalToast('error', 'Failed Comment', 'Failed to post your comment. The server might be down; try again later!')
}

const populateEditModal = function (oldCommentText, oldCommentId) {
  $('#descr3').text(oldCommentText)
}

const editCommentSuccess = function () {
  $('#edit-comment-form').each(function () {
    this.reset()
  })
  $('#edit-comment-modal').modal('hide')
  notification.universalToast('success', 'Success!', 'Your comment was successfully updated!')
}

const editCommentFailure = function () {
  $('#edit-comment-form').each(function () {
    this.reset()
  })
  $('#edit-comment-modal').modal('hide')
  notification.universalToast('error', 'Failed Comment', 'Failed to post your comment. The server might be down; try again later!')
}

const myImagesViewFailure = () => {
  notification.universalToast('error', 'Failed to Load', 'Failed to load your images. The server might be down; try again later!')
}

module.exports = {
  onSignInSuccess,
  onSignInFailure,
  onSignUpSuccess,
  onSignUpFailure,
  onLogOutSuccess,
  onLogOutFailure,
  onChangePwdSuccess,
  onChangePwdFailure,
  uploadImagesView,
  returnToCarouselView,
  myImagesView,
  deleteImageSuccess,
  deleteImageFailure,
  populateCarouselSuccess,
  populateCarouselFailure,
  populateCarouselModalSuccess,
  populateCarouselModalFailure,
  toggleEditImageModalSuccess,
  toggleEditImageModalFailure,
  editImageSuccess,
  editImageFailure,
  noGeoTracking,
  timeOutMessage,
  addCommentSuccess,
  addCommentFailure,
  populateEditModal,
  editCommentSuccess,
  editCommentFailure,
  myImagesViewFailure
}
