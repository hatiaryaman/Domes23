const mainNav = document.getElementsByClassName('main')[0]
const learnNav = document.getElementsByClassName('learn')[0]
const signupNav = document.getElementsByClassName('signup')[0]
const userNav = document.getElementsByClassName('user')[0]

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

learnNav.addEventListener('click', function() {
    window.location.href = '../Learn/learn.html'
})

signupNav.addEventListener('click', function() {
    window.location.href = '../Signup/signup.html'
})

userNav.addEventListener('click', function() {
    window.location.href = '../Account/account.html'
})

const signupRedirect = document.getElementsByClassName('signup-redirect')[0]

signupRedirect.addEventListener('click', function() {
    window.location.href = "../Signup/signup.html"
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
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";
import { getFirestore, collection, getDoc, doc, setDoc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
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

const loginButton = document.getElementsByClassName('submit')[0]

loginButton.addEventListener('click', (event) => {
    event.preventDefault()
        
    const email = document.getElementById('name').value
    const password = document.getElementById('password').value

    if (email == "" || password == "") {
        status("Fill out the email and password.", "#ff0000")
        return
    }

    const auth = getAuth();
    const db = getFirestore()

    signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        const user = userCredential.user;

        const docRef = doc(db, "Users", user.uid)
        const docSnap = await getDoc(docRef)

        localStorage.setItem('Username', docSnap.data()['userName'])
        localStorage.setItem('UserId', user.uid)
        localStorage.setItem('email', docSnap.data()['email'])
        status('Login successful!', '#0000e1', true)
    })
    .catch((error) => {
        const errorCode = error.code;
        if (errorCode == 'auth/invalid-credentials') {
            status('Incorrect email or password', '#ff0000')
        } else {
            status('User does not exist', '#ff0000')
        }
    })
})

const statusMessage = document.getElementsByClassName('message')[0]

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