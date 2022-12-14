# CITS3200-Team-4

# Set-up
## Node.js  
For this project, Node.js must be downloaded and installed from their website at https://nodejs.org/en/.

## Installing Expo CLI
Open the Command Prompt and run the following command: `npm install --global expo-cli`  
This installation will take some time. Once it is complete, verify the installation was successful by running the command: `expo whoami`  
If successful, a "Not logged in" message will be displayed.

## Initalising the project
Next, navigate to the directory you would like to store the project in. Run `npx create-expo-app <project-name-here>` and then navigate to it via `cd <project-name-here>` once the project is initialised. Run `npx expo start` to verify the project has been correctly installed. Close the project.

In the same directory, run `git clone <project url>` to create a local copy of the gitHub repository. Once this is done, the repository files should be located in a new folder called 'CITS3200-Team-4'. Open this folder and copy all of the files inside into your project directory, replacing any files which already exist with the same name.

## Installing Firebase
Open the Command Prompt and navigate to the directory you have the project stored. Run the following command: `npx expo install firebase`. Additionally, check your email and accept the invitation to become a member of the firebase project.

That's it! The configuration file for firebase is already included in the GitHub, and the project has already been setup on the firebase website.

## Installing Expo location
Open the Command Prompt and navigate to the directory you have the project stored. Run the following command: npx expo install expo-location

## Installing Map feature required for expo location
Open the Command Prompt and navigate to the directory you have the project stored. Run the following command: expo install react-native-maps

## Installing Task Manager required by expo location to ask for foreground permissions
Open the Command Prompt and navigate to the directory you have the project stored. Run the following command: expo install expo-task-manager

## Running the app on the phone
To run the app on your phone , go to the google play store and download the expo app . b.	From the expo application, you can scan the QR code to see the app functionality on your phone

## Running the app on a browser
Open the Command Prompt and navigate to the directory you have the project stored. Run the following command: npx expo install @expo/webpack-config@^0.17.0 .
However do note that location functionalities are not available on browser ,and this feature was mainly used for debugging and testing integration of the app as a whole


