# Music List #

## Packagae choices: ##

1. Built using React based NextJS framework: NextJS because it makes it much easier to scale the app.
2. Mui: A mature and stable library for styling. It is easy and intuitive to use and significantly reduces the need to write CSS.
3. react-flip-move: Used for animation when objects in a list change.
4. timeago.js: Used to convert review timestamps to a duration from the current timestamp.

 ## Steps to run the app:  ##

1. Install node version 18.7.0
2. `npm install`
3. `npm run dev`


 ## Improvements: ##

1. Search Feature: Users should be able to search tracks using collection name, artist name, track name.
2. User registration and authentication: Can be used to personalise track list and facilitate interaction among users
3. Like Feature: Users can keep a list of their favorite tracks. This feature can help in the personalosation as well.
4. Better quality images
5. Proper server-side database: Currenly with only 50 tracks and just one user, we don't need a proper database. But we would obviously need a properly database to scale the app. 
6. I would have liked for the reviews to be opened up in a dedicated modal, making it easier for users to post and view larger reviews.


 ## Production Consideration: ##


1. build the app by running the following command:

    npm run build



 ## Assumptions:  ##

1. Browser has the following extension installed and activated to avoid CORS errors:

    https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
