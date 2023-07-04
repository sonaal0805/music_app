# Music List #

## Packagae choices: ##

1. Built using React based NextJS framework: NextJS because it makes it much easier to scale the app.
2. Mui: A mature and stable library for styling. It is easy and intuitive to use and significantly reduces the need to write CSS.
3. react-flip-move: Used for animation when objects in a list change.
4. timeago.js: Used to convert review timestamps to a duration from the current timestamp.

 ## Steps to run the app:  ##

1. Install node version 18.7.0
2. Install the required dependencies by running: 
    `npm install`
3. Run the development environment by running:
    `npm run dev`


 ## Improvements: ##

1. Search Feature: Users should be able to search tracks using collection name, artist name, track name.
2. User Registration and Authentication: Can be used to personalize track lists and facilitate interaction among users.
3. Like Feature: Users can keep a list of their favorite tracks. This feature can help in personalization as well.
4. Better quality images
5. Proper Server-side Database: Currently, with only 50 tracks and just one user, we don't need a proper database. But we would obviously need a proper database to scale the app.
6. Allowing users to edit a comment directly from the comment modal. 


 ## Production Consideration: ##

1. There is a peer dependency conflict between react and material ui. To avoid this conflict during deployment, use the following command to install the dependencies
    `npm install --legacy-peer-deps`
2. Backup and Recovery: We should have a backup and recovery plan in place in case of data loss or system failure. 

 ## Assumptions:  ##

1. Browser has the following extension installed and activated to avoid CORS errors:

    https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
