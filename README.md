# Bela Block Documentation
## What is Bela Block 
Bela block is a project that makes: writing score, counting cards, keeping stats, attending and playing tournaments for the card game bela easy.

## Writing score
We have state of the art ui that makes writing and keeping score easy.

## Counting cards
Our deep learning machine model based on yolo can count the cards for you. Reducing the time you spend doing boring math and increasing the time playing bela 

## Stats
All of the results are saved on firebase. Statistics are available for players that want to improve their game or be informed about their playing. 

## Tournaments 
We have a system that makes promoting tournaments to our player base just a few clicks away. While the players receive notifications about tournaments happening at their favorite bars and can sign up directly using the app.

# Project requirements
- Some IDE or text editor
- Node LTS, with npm installed
- Administrator access to your computer
- Valid Gmail account

# Setting up a Firebase project

- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Create Firebase project"
- Give it a name and click "Continue"
- You can disable Gemini and Google Analytics
- After the project gets created open it
- Click the third icon (</>) below "Get started by adding Firebase to your app"
- Give the web app a name and turn on Firebase Hosting
- Follow the steps of "Add Firebase SDK"
- Open `src/firebase/firebase.tsx` and paste your firebaseConfig from the Firebase Console, then click next
- Follow the steps of "Install Firebase CLI", after click next
- On step "Deploy to Firebase Hosting" just run `firebase login` and login with the same Gmail Account you used in the Firebase Console
- Click "Continue to console"

# Setting up Firebase Firestore Database

- On the left side in Firebase Console click on Build > Firestore Database
- Click on "Create database"
- Choose a location close to use, we choose eur3 and then click next
- Choose "Start in test mode" and click create

# Setting up Authentication

- On the left side in Firebase Console click on Build > Authentication
- Click "Get started"
- Click on "Email/Password" and only enable Email/Password
- On the navbar go to "Sign-in method", click "Add new provider" and select Google
- Enable it, and add a support email for the project. Don't change anything else and click Save
- Now on the top navbar choose Settings and check under "User account linking" the option chosen is "Link accounts that use the same email"

# Setting up Hosting
- On the left side in Firebase Console click on Build > Hosting
- Click continue on all prompts until you get to the console

# Configuring the project
- Use either git clone or Download a ZIP to download the project
- Extract it and open it with an IDE, we use Visual Studio Code
- If not allready open, open the terminal either inside VS Code or as a seprate application and navigate to the main project directory and type `npm i` to install all required modules to run this application
- While you wait open `src/.firebaserc` and replace our project name with your. You can find it by looking at the firebaseConfig from before, under projectId

# How to deploy?

### Hint: You can look at your builds by clicking on the left side in Firebase Console click on Build > Hosting
- In your console write `vite build`
- After a successful build you can run `firebase deploy --only hosting`
- After a build was successful you can go to the domain listed in the Firebase Console under Build > Hosting, it will be <your_project>.web.app
- If that was successful and you can login and interact with the app you also need to run this, _**but only once if not stated otherwise**_ `firebase deploy --only firestore:rules`

# How to do CI/CD?

- To deploy a new version to the world you just need to run two commands: `vite build` and `firebase deploy --only hosting`
- After you should see the new version show up in the Firebase Console under the Hosting tab

# How to run locally?

- To run locally you just need to run `firebase emulators:start` followed by running `vite --host` in a separate terminal, then in the vite window you will see a list of available domains, it will probably be [http://localhost:5174](http://localhost:5174), open it in your browser
- To run locally but using the production authentication and/or database go to `src/firebase/firebase.tsx` and comment out what you want to be served from production. After changing save the file and again run `vite --host`. If you decided you want some parts of the test environment run in a separate terminal `firebase emulators:start`

```JS
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(db, 'localhost', 8080); //Local Database
  connectAuthEmulator(auth, 'http://localhost:9099'); // Local Authentication
}
```
- To view what is happening in the emulator you can open your browser and go to [http://localhost:4000](http://localhost:4000)
- For more information about the Firebase emulator you can click [here](https://firebase.google.com/docs/emulator-suite)
