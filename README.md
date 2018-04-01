# Clique - Photos near you wherever you happen to be!
Clique is a geolocation-based file sharing client designed to help you explore your surroundings wherever you happen to be.  Just sign in, upload, your photos, and your community carousel will display photos uploaded by other members within your geographical area.

## Repository links
[Client Repo] - https://github.com/FiniteL00p/pctr
[Backend/API Repo] - https://github.com/FiniteL00p/pctr_api

## Deployed links
[Client] - https://finitel00p.github.io/pctr/
[Backend/API] - https://file-bucket-api.herokuapp.com/

## Overview
When you upload a photo our app will use the photo's embedded EXIF data to determine where the photo was taken and automatically add it to the "Your Community" carousel. What's more, it will follow you wherever you go!  In Amsterdam on Tuesday but will be in Miami on Friday?  No problem!  The site will use your geolocation to show you photos other users have taken nearby and uploaded to the site.

The site is optimized for GPS-enabled cameras.  The majority of smartphones and DSLRs have this capability.  Currently, the site will automatically hard code a fixed location for photos taken on older cameras without GPS.

## Technologies and Platforms
### Front-end
  1. HTML5 (including Handlebars) and CSS3
  2. Bootstrap v3.3.7
  3. JavaScript
  4. jQuery for DOM manipulation and jQuery/AJAX for API interactions
  5. 3rd party npm modules
    a. geolib: Used to calculate geographical distances based on GPS coordinates
    b. dms2dec: Converts GPS coordinates from degrees, minutes, and seconds to decimal notation
    c. exif-js: Extract the GPS coordinates from the photo's EXIF data

### Back-end
  1. Node.js
  2. MongoDB and Mongoose
  3. Google Reverse Geocoding API

## Client-specific Planned Future Enhancements
1. [Feature Description] - Allow for a user definable geographical radius within which to display the photos from the database
2. [Feature Description] - Fix image orientation issue for smartphone photos taken in the upright position
3. [Feature Description] - Allow users to manually specify the location info for photos without embedded EXIF data
4. [Feature Description] - Improve geolocation API performance and reliability
5. [Feature Description] - Add search capability using tags or other metadata
6. [Feature Description] - Populate the carousel to display most recent images first

## Entity Relationship Diagram, User Stories, & Wireframes
The ERD and wireframes for this project can be found at https://imgur.com/a/mzRop

-MVP User Stories-
1. As a user, I want to be able to sign up for this app.
2. As a user, I want to be able to sign-in.
3. As a user, I want to be able to change my password.
4. As a user, I want to be able to upload an image.
5. As a user, I want to be able to edit fields/information associated with that image.
6. As a user, I want to be able to destroy a photo that I upload.
7. As a user, I want to be able to see uploaded photos.
8. As a user, I want to be able to download a photo.

-Bonus User Stories-
1. As a user, I want to be able to see photos based on their geographic location.
2. As a user, I want to be able to delete my account.
3. As a user, I want to be able to like/comment on other people's photos.
4. As a user, I want to know if someone has liked or commented on my photos.
5. As a user, I want to have a username.

## Project Development Schedule
Day 1
  * Objectives:
    - Agree on a purpose/theme for the website
    - Develop basic wireframes and an ERD
    - Get a working shell of a landing page with user authentication
Day 2
  * Objectives:
    - Finalize landing page and user authentication functionality
    - Get a working shell of the "my photos", "upload photos", and "community carousel" pages
Day 3
  * Objectives
    - Continue working on the site layout and incorporate styling wherever time allows
    - Get user upload functionality working incorporating the ability to upload multiple photos at once if possible
Day 4
  * Objectives
    - Extract EXIF data from photos and store in the database
    - Get user's geolocation data and store in the database
    - Get geo-distance logic and code working
Day 5
  * Objectives
    - Enable user tags and comments
    - Finalize site styling and
Day 6
  * Objectives
    - Finalize documentation, close out any remaining issues

## [License](LICENSE)

1. All content is licensed under a CC­BY­NC­SA 4.0 license.
1. All software code is licensed under GNU GPLv3. For commercial use or
    alternative licensing, please contact legal@ga.co.
