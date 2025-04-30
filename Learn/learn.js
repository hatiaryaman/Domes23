const mainNav = document.getElementsByClassName('main')[0]
const shareNav = document.getElementsByClassName('share')[0]
const signUpNav = document.getElementsByClassName('signup')[0]
const loginNav = document.getElementsByClassName('login')[0]
const userNav = document.getElementsByClassName('userName')[0]
const stuffNav = document.getElementsByClassName('mystuff')[0]
const accountNav = document.getElementsByClassName('myaccount')[0]
const logoutNav = document.getElementsByClassName('logout')[0]

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

shareNav.addEventListener('click', function() {
    if (userName == null) {
        window.location.href = '../Login/login.html'
    }
})

signUpNav.addEventListener('click', function() {
    window.location.href = '../Signup/signup.html'
})

loginNav.addEventListener('click', function() {
    window.location.href = '../Login/login.html'
})

stuffNav.addEventListener('click', function() {
    window.location.href = '../Mystuff/mystuff.html'
})

accountNav.addEventListener('click', function() {
    window.location.href = '../Account/account.html'
})

logoutNav.addEventListener('click', function() {
    localStorage.removeItem('Username')
    localStorage.removeItem('UserId')
    localStorage.removeItem('email')

    window.location.href = "../Home/home.html"
})

const searchBarContainer = document.getElementsByClassName('div-block-5')[0]
const searchBar = document.getElementsByClassName('search-bar')[0]

searchBarContainer.addEventListener('click', function() {
    searchBar.focus()
})

let userName = localStorage.getItem('Username')
    
if (userName != null) {
    loginNav.style.display = "none"
    signUpNav.style.display = "none"
    userNav.innerHTML = userName

    document.getElementsByClassName('div-block-3')[0].style.display = "none"
} else {
    userNav.style.display = "none"
    document.getElementsByClassName('user')[0].style.display = "none"
}

const list = document.getElementsByClassName('list')[0]

class ListElem {
    constructor(title, chars, eqs, imgs) {
        this.title = title;
        this.chars = chars;
        this.eqs = eqs;
        this.imgs = imgs;

        this.newElem = document.createElement('li')
        this.newElem.setAttribute('class', 'list-item')

        const container1 = document.createElement('div')
        container1.setAttribute('class', 'div-block-6')
        container1.addEventListener('click', function() {
            window.location.href = '../Lesson/lesson.html'
            localStorage.setItem('title', title)
        })

        const container2 = document.createElement('div')
        container2.setAttribute('class', 'div-block-9')

        const text1 = document.createElement('div')
        text1.setAttribute('class', 'text-block-13')
        text1.innerHTML = this.title

        const container3 = document.createElement('div')
        container3.setAttribute('class', 'div-block-8')

        const container4 = document.createElement('div')
        container4.setAttribute('class', 'div-block-7')

        const charactersInfo = document.createElement('div')
        charactersInfo.setAttribute('class', 'characters')
        charactersInfo.innerHTML = 'Characters - ' + this.chars

        const equationsInfo = document.createElement('div')
        equationsInfo.setAttribute('class', 'equations')
        equationsInfo.innerHTML = 'Equations - ' + this.eqs

        const imagesInfo = document.createElement('div')
        imagesInfo.setAttribute('class', 'images')
        imagesInfo.innerHTML = 'Images - ' + this.imgs

        container2.appendChild(text1)
        container4.appendChild(charactersInfo)
        container4.appendChild(equationsInfo)
        container4.appendChild(imagesInfo)
        container1.appendChild(container2)
        container1.appendChild(container3)
        container1.appendChild(container4)
        this.newElem.appendChild(container1)
        list.appendChild(this.newElem)
    }
}

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
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
const db = getFirestore();

// Setup
const lessons = collection(db, 'Lessons')

getDocs(lessons).then((snapShot) => {
    snapShot.docs.forEach((doc) => {
        let data = doc.data()

        if (data['published']) {
            new ListElem(data['Title'], data['Characters'], data['Equations'], data['Images'])
        }
    })
})
