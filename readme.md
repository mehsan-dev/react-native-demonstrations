# React Native Project

### Starting the Project

` npm install`

`npx expo start`

`Scan the QR code in your 'Expo Go' app `

Note: Both devices should be connected to the same network

### Dependencies

- Create an account on firebase
- Register an app on firebase
- Copy and paste your firebase app credentials in
  - `src/config/firebaseConfig.js`
- Start your backend server and paste server IP and Port in
  - `src/constants`

### Implemented Features

- #### Splash Screen
- #### AUTH
  - Login & Sigup with validations
  - Forgot/reset password functionality
- #### Notification Screen
  - Pressing the Notify button will send a notification to your deivice instantly.
- #### Image Screen
  - Images can be selected/captured and stored in firestore and then rendered on frontend
  - First capture an image or select it from gallery
  - Second press the upload button to upload it to the firestore
  - Uploaded imaged will be rendered on Screen
  - Can retake the image again or discard the selected image
- #### Text Screen
  - Enter a text into the input box
  - Press Send
  - The text will be sent to firestore and fetched back using snapshot and displayed on Screen
- #### Calculator Screen
  - Enter two numbers
  - Select an operation from dropdown
  - Press calculate
  - A request will be sent to the backend server
  - Result will be displayed on frontend

### Future Improvements

- Authentication flow can further be improvised by persisting the authentication token comming from backend server in the local storage of application and guarding the screens.
