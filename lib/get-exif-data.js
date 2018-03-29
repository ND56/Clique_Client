'use strict'

const dms2dec = require('dms2dec') // GPS coord to decimal converter
const EXIF = require('exif-js') // Require exif-js npm module
const store = require('../assets/scripts/store')
const notification = require('./notifications')

// // Important: You have to wait for the image to be completely loaded before calling getData or any other function or it will silently fail. exif-js file docs recommend implementing this wait by running your exif-extracting logic on the window.onLoad function.
// window.onload = getExifData

function getExifData (event) {
  const file = event.target.files[0]
  console.log(file)
  if (file) {
    // Extract the exif data from the file.
    EXIF.getData(file, function () {
      const exifData = EXIF.pretty(this)
      console.log('exifData is ' + exifData.length + ' characters long')
      // If exif data is less than 300 characters it most likely doesn't have GPS data.  Only processing
      if (exifData.length >= 300) {
        const long = EXIF.getTag(this, 'GPSLongitude')
        const longRef = EXIF.getTag(this, 'GPSLongitudeRef')
        const lat = EXIF.getTag(this, 'GPSLatitude')
        const latRef = EXIF.getTag(this, 'GPSLatitudeRef')
        const dec = dms2dec(`${long[0].numerator}/1, ${long[1].numerator}/1, ${long[2].numerator}/100`, longRef, `${lat[0].numerator}/1, ${lat[1].numerator}/1, ${lat[2].numerator}/100`, latRef)
        return $.ajax({
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + dec[1] + ',' + dec[0] + '&key=AIzaSyCX0ex3pw7jXZSNawU17hOREiPwW4yEUqw',
          method: 'GET'
        })
          .then((data) => {
            const response = data
            const master = response.results[0].formatted_address
            const addressArray = master.split(',')
            const stateZip = addressArray[2].split(' ')
            store.exifData.longitude = dec[0]
            store.exifData.latitude = dec[1]
            console.log()
            store.exifData.city = addressArray[1].trim()
            store.exifData.state = stateZip[1].trim()
            store.exifData.country = addressArray[3].trim()
          })
      } else {
        notification.staticToast('info', 'Sorry!', 'This app requires photos with embedded GPS data such as photos taken with a smartphone or GPS-capable DSLR.  We\'re excited to have you share your photos so we\'ve added a default GPS location of Boston.  Thanks for trying PCTR!', 'blue')
        store.exifData.longitude = -71.05603055555555
        store.exifData.latitude = 42.35146388888889
        console.log()
        store.exifData.city = 'Boston'
        store.exifData.state = 'MA'
        store.exifData.country = 'USA'
      }
    })
  }
}

module.exports = getExifData
