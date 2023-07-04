# Music List #

## Package choices: ##

1. Built using React based NextJS framework: NextJS offers various features, such as image optimization, simplified routing techniques, and server-side components, that make scaling the app significantly easier.
2. Mui: A mature and stable library for styling. It is easy and intuitive to use and significantly reduces the need to write CSS.
3. timeago.js: Used to convert review timestamps to a duration from the current timestamp.

 ## Steps to run the app:  ##

1. Install node version 18.7.0
2. Install the required dependencies by running: 
    `npm install`
3. Run the development environment by running:
    `npm run dev`


 ## Improvements: ##

1. Search Feature: The search feature should allow users to search for tracks using the collection name, artist name, and track name.
2. User Registration and Authentication: User registration and authentication should be implemented to enable personalization of track lists and facilitate interaction among users.
3. Like Feature: The "like" feature should be implemented so that users can create and maintain a list of their favorite tracks, which can aid in personalization.
4. High-quality Images: High-quality images should be provided to enhance the overall user experience.
5. Server-side database: A proper server-side database will be necessary to scale the app as it grows beyond its current size of 50 tracks and one user.
6. Edit from Comment Modal: Users should be able to edit comments directly from the comment modal for improved usability.
7. PWA Implementation: Implementing PWA can enhance the user experience and leverage the features of native mobile devices.
8. Testing Script: In order to eliminate bugs, it's important to conduct both unit and end-to-end testing. Tools such as Jest can be used to automate this process.


 ## Production Consideration: ##

1. There is a peer dependency conflict between react and material ui. To avoid this conflict during deployment, use the following command to install the dependencies
    `npm install --legacy-peer-deps`
2. Backup and Recovery: We should have a backup and recovery plan in place in case of data loss or system failure. 

 ## Assumptions:  ##

1. Browser has the following extension installed and activated to avoid CORS errors:

    https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
