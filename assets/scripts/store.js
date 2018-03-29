'use strict'

const store = {
  // store.user contains current user information (ui.onSignInSuccess)
  // store.currentImageID is set for purposes of AJAX/DOM delete (ui.onDeleteImage)
  // store.view contains current view location; it starts at landing Page
  exifData: {

  }
  // store.currentCarouselId stores ID of selected image in carousel so you can make a get request to populate the modal that appears
  // store.recentEditedData stores the user's inputs into edit fields for use in immediate DOM manipulation
}

module.exports = store
