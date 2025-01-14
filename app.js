import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDwrgm6o6xQWMwFquz3bRMQUfu5xe7vkbc",
authDomain: "authproject-62b2d.firebaseapp.com",
projectId: "authproject-62b2d",
storageBucket: "authproject-62b2d.firebasestorage.app",
messagingSenderId: "749088271021",
appId: "1:749088271021:web:f7c9864f0c7046c3aff424",
measurementId: "G-9C2XHNCV69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#auth-form");
const secretContent = document.querySelector("#secretContent");
const signInBtn = document.querySelector("#signInBtn");
const signOutBtn = document.querySelector("#signOutBtn");
const signUpBtn = document.querySelector("#signUpBtn");


secretContent.style.display = "none";

const userSignUp = async() => {
  const signUpEmail = userEmail.value;
  const signUpPassword = userPassword.value;
  createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
  .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      alert("Your account has been created!");
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage)
  })
}

const userSignIn = async() => {
  const signInEmail = userEmail.value;
  const signInPassword = userPassword.value;
  signInWithEmailAndPassword(auth, signInEmail, signInPassword)
  .then((userCredential) => {
      const user = userCredential.user;
      alert("You have signed in successfully!");
      window.location.href = "index2.html"; 
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + errorMessage)
  })
}

const checkAuthState = async() => {
  onAuthStateChanged(auth, user => {
      if(user) {
          authForm.style.display = 'none';
          secretContent.style.display = 'block';
      }
      else {
          authForm.style.display = 'block';
          secretContent.style.display = 'none';
      }
  })
}

const userSignOut = async() => {
  await signOut(auth);
}

checkAuthState();

signUpBtn.addEventListener('click', userSignUp);
signInBtn.addEventListener('click', userSignIn);
signOutBtn.addEventListener('click', userSignOut);

