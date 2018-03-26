const notificationDiv = '.notification-banner'
require('jquery-toast-plugin')

const alert = function (status, message) {
  $(notificationDiv).html('')
  const successHTML = '<div class="alert alert-success alert-dismissible" role="alert">' +
  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
  '<span aria-hidden="true">&times;</span></button>' + message + '</div>'

  const errorHTML = '<div class="alert alert-danger alert-dismissible" role="alert">' +
  '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
  '<span aria-hidden="true">&times;</span></button>' + message + '</div>'

  if (status === 'success') {
    $(notificationDiv).append(successHTML)
  } else {
    $(notificationDiv).append(errorHTML)
  }
}

const removeAllNotifications = function () {
  $(notificationDiv).html('')
}

const universalToast = function (icon, heading, text) {
  // icon should be info, warning, error, or success
  $.toast({
    heading: heading, // heading of toast
    text: text, // body of toast
    showHideTransition: 'slide', // transition animation; alts incl. fade or plain
    position: 'top-right', // top- or bottom- right, left center and mid-center
    icon: icon,
    bgColor: '#1F888F', // background color // currently like the skyline blue
    textColor: 'white', // text color
    loaderBg: 'white' // color of loader
    // additional options below
    // textAlign: 'left', 'right', 'center'
    // hideAfter: 3000 (false or miliseconds)
    // allowToastClose: true/false
    // stack: 5 (false if only ever one at a time or # equalling max at a time)
    // loader: true/false (can hide it)
  })
}

module.exports = {
  alert,
  universalToast
}
