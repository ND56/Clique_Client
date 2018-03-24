const notificationDiv = '.notification-banner'

const notification = function (status, message) {
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

module.exports = notification
