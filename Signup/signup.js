const mainNav = document.getElementsByClassName('main')[0]
const learnNav = document.getElementsByClassName('learn')[0]
const loginNav = document.getElementsByClassName('login')[0]
const userNav = document.getElementsByClassName('user')[0]

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

learnNav.addEventListener('click', function() {
    window.location.href = '../Learn/learn.html'
})

loginNav.addEventListener('click', function() {
    window.location.href = '../Login/login.html'
})

userNav.addEventListener('click', function() {
    window.location.href = '../Account/account.html'
})

const loginRedirect = document.getElementsByClassName('login-redirect')[0]

loginRedirect.addEventListener('click', function() {
    window.location.href = "../Login/login.html"
})

let userName = localStorage.getItem('Username')
    
if (userName != null) {
    loginNav.style.display = "none"
    signUpNav.style.display = "none"
    userNav.innerHTML = userName

    document.getElementsByClassName('div-block-3')[0].style.display = "none"
} else {
    userNav.style.display = "none"
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, setDoc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTFcoGEb0M5kq6muwcvTVScYWwpQCmp38",
  authDomain: "lessons-1c2f7.firebaseapp.com",
  projectId: "lessons-1c2f7",
  storageBucket: "lessons-1c2f7.firebasestorage.app",
  messagingSenderId: "653725225214",
  appId: "1:653725225214:web:333d48acd88290be5e95af",
  measurementId: "G-TWN0LL7Y77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const submitButton = document.getElementsByClassName('submit')[0]
const statusMessage = document.getElementsByClassName('message')[0]

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    let userName = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let cPassword = document.getElementById('c-password').value

    let permit = (userName != "") && (email != "") && (password != "") && (cPassword == password)
    
    if (permit) {
        registerUser(userName, email, password)
    }
})

function status(message, color, v=false) {
    statusMessage.style.opacity = 0.6
    statusMessage.style.backgroundColor = color
    statusMessage.innerHTML = message
    setTimeout(()=>{
        statusMessage.style.opacity = 0;
        if (v) {
            window.location.href = "../Home/home.html";
        }
    },5000)
}

function registerUser(userName, email, password) {
    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user
        const userData = {
            userName: userName,
            email: email
        }
        const docRef = doc(db, 'Users', user.uid)
        setDoc(docRef, userData)
        .then(() => {
            localStorage.setItem('Username', userName)
            localStorage.setItem('UserId', user.uid)
            localStorage.setItem('email', email)
            status("Account Successfully Created!", "#0000e1", true)
        })
        .catch((error) => {
            console.log("error:" + error)
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/email-already-in-use') {
            status("Email is already in use.", "#ff0000", false)
        } else {
            status("Unable to create user.", "#ff0000", false)
        }
    })
}