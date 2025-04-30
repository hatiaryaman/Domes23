const mainNav = document.getElementsByClassName('main')[0]
const learnNav = document.getElementsByClassName('learn')[0]
const stuffNav = document.getElementsByClassName('mystuff')[0]
const userNav = document.getElementsByClassName('user')[0]
const userNameTag = document.getElementsByClassName('userName')[0]
const logoutNav = document.getElementsByClassName('logout')[0]

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

learnNav.addEventListener('click', function() {
    window.location.href = '../Learn/learn.html'
})

stuffNav.addEventListener('click', function() {
    window.location.href = '../Mystuff/mystuff.html'
})

logoutNav.addEventListener('click', function() {
    localStorage.removeItem('Username')
    localStorage.removeItem('UserId')
    localStorage.removeItem('email')

    window.location.href = "../Home/home.html"
})

var userName = localStorage.getItem('Username')
var userId = localStorage.getItem('UserId')
var currentUser = localStorage.getItem('currentUser')
var userEmail = localStorage.getItem('email')

userNameTag.innerHTML = userName
document.getElementsByClassName('div-block-3')[0].style.display = "none"

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getFirestore, collection, getDoc, doc, setDoc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, updateEmail, updatePassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js"
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
const db = getFirestore();

const docRef = doc(db, 'Users', userId)
const docSnap = await getDoc(docRef)

const userNameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const oPasswordInput = document.getElementById('o-password')
const passwordInput = document.getElementById('password')
const cPassword = document.getElementById('c-password')

userNameInput.value = docSnap.data()['userName']
emailInput.value = docSnap.data()['email']

const updateButton = document.getElementsByClassName('submit')[0]

updateButton.addEventListener('click', async (event) => {
    event.preventDefault()

    let userName = document.getElementById('name').value
    let email = document.getElementById('email').value
    let oPassword = document.getElementById('o-password').value
    let password = document.getElementById('password').value
    let cPassword = document.getElementById('c-password').value

    let permit = (cPassword == password)

    if (permit) {
        let newPassword = (password == "")? String(docSnap.data()['password']) : password

        await setDoc(doc(db, 'Users', userId), {
            'userName': userName,
            'email': email
        })

        const auth = getAuth()

        console.log(userEmail)

        signInWithEmailAndPassword(auth, userEmail, oPassword)
        .then(async (userCredential) => {
            const currentUser = userCredential.user;

            updateEmail(currentUser, email)
            .then(() => {
                updatePassword(currentUser, newPassword)
                .then(() => {
                    localStorage.setItem('Username', userName)
                    localStorage.setItem('email', email)
                    console.log(localStorage.getItem('email'))
                    status('Account updated successfully!', '#0000e1', true)
                })
                .catch((error) => {
                    console.log(error)

                    status('An error has occured.', '#ff0000')
                })
            })
            .catch((error) => {
                console.log(error)

                status('An error has occured.', '#ff0000')
            })
        })
        .catch((error) => {
            console.log(error)
            status('User information is incorrect.', '#ff0000')
        })
    }
})

const statusMessage = document.getElementsByClassName('message')[0]

function status(message, color, v=false) {
    statusMessage.style.opacity = 0.6
    statusMessage.style.backgroundColor = color
    statusMessage.innerHTML = message
    setTimeout(()=>{
        statusMessage.style.opacity = 0;
        if (v) {
            window.location.href = "./account.html";
        }
    },5000)
}