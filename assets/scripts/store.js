'use strict'

const store = {
  // store.user contains current user information (ui.onSignInSuccess)
  // store.currentImageID is set for purposes of AJAX/DOM delete (ui.onDeleteImage)
  // store.view contains current view location; it starts at landing Page
  view: 'landing page'
}

module.exports = {
  store
}
