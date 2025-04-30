const tooltip = document.getElementsByClassName('tooltip')[0]

document.addEventListener('mousemove', (event) => {
    tooltip.style.left = `calc(${event.clientX}px + 20px)`
    tooltip.style.top = event.clientY
})

const mainNav = document.getElementsByClassName('main')[0]
const learnNav = document.getElementsByClassName('learn')[0]
const signUpNav = document.getElementsByClassName('signup')[0]
const loginNav = document.getElementsByClassName('login')[0]
const userNav = document.getElementsByClassName('userName')[0]
const accountNav = document.getElementsByClassName('myaccount')[0]
const logoutNav = document.getElementsByClassName('logout')[0]
const addButton = document.getElementsByClassName('add')[0]
let silence = true

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

learnNav.addEventListener('click', function() {
    window.location.href = '../Learn/learn.html'
})

signUpNav.addEventListener('click', function() {
    window.location.href = '../Signup/signup.html'
})

loginNav.addEventListener('click', function() {
    window.location.href = '../Login/login.html'
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
    constructor(title, chars, eqs, imgs, color='#000') {
        this.title = title;
        this.chars = chars;
        this.eqs = eqs;
        this.imgs = imgs;

        this.newElem = document.createElement('li')
        this.newElem.setAttribute('class', 'list-item')

        const container1 = document.createElement('div')
        container1.setAttribute('class', 'div-block-6')
        container1.style.borderColor = color
        container1.addEventListener('click', function() {
            window.location.href = '../Lesson/lesson.html'
            localStorage.setItem('title', title)
        })

        const containerImg = document.createElement('div')
        containerImg.setAttribute('class', 'containerImg')

        const trashImg = document.createElement('img')
        trashImg.setAttribute('class', 'trash')
        trashImg.src = './trash.png'
        trashImg.addEventListener('click', () => {removeProject(title)})
        trashImg.addEventListener('mouseenter', () => {
            tooltip.innerHTML = 'Delete'
            setTimeout(()=>{
                tooltip.style.opacity = 1
            },300)
        })
        trashImg.addEventListener('mouseleave', () => {
            tooltip.style.opacity = 0
            setTimeout(()=>{
                //tooltip.innerHTML = ''
            },300)
        })

        const uploadImg = document.createElement('img')
        uploadImg.setAttribute('class', 'upload')
        uploadImg.src = './upload.png'
        if (color == '#000') {
            uploadImg.style.transform = 'rotate(180deg)'
            uploadImg.addEventListener('click', () => {returnProject(title)})
        } else {
            uploadImg.addEventListener('click', () => {uploadProject(title)})
        }
        uploadImg.addEventListener('mouseenter', () => {
            tooltip.innerHTML = 'Upload'
            setTimeout(()=>{
                tooltip.style.opacity = 1
            },300)
        })
        uploadImg.addEventListener('mouseleave', () => {
            tooltip.style.opacity = 0
            setTimeout(()=>{
                //tooltip.innerHTML = ''
            },300)
        })

        const container2 = document.createElement('div')
        container2.setAttribute('class', 'div-block-9')

        const text1 = document.createElement('div')
        text1.setAttribute('class', 'text-block-13')
        text1.innerHTML = this.title
        text1.style.color = color

        const container3 = document.createElement('div')
        container3.setAttribute('class', 'div-block-8')
        container3.style.borderColor = color

        const container4 = document.createElement('div')
        container4.setAttribute('class', 'div-block-7')

        const charactersInfo = document.createElement('div')
        charactersInfo.setAttribute('class', 'characters')
        charactersInfo.innerHTML = 'Characters - ' + this.chars
        charactersInfo.style.color = color

        const equationsInfo = document.createElement('div')
        equationsInfo.setAttribute('class', 'equations')
        equationsInfo.innerHTML = 'Equations - ' + this.eqs
        equationsInfo.style.color = color

        const imagesInfo = document.createElement('div')
        imagesInfo.setAttribute('class', 'images')
        imagesInfo.innerHTML = 'Images - ' + this.imgs
        imagesInfo.style.color = color

        container2.appendChild(text1)
        container4.appendChild(charactersInfo)
        container4.appendChild(equationsInfo)
        container4.appendChild(imagesInfo)
        container1.appendChild(containerImg)
        containerImg.appendChild(trashImg)
        containerImg.appendChild(uploadImg)
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
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
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
var titleToId = {}

getDocs(lessons).then((snapShot) => {
    snapShot.docs.forEach((doc) => {
        let data = doc.data()

        if (data['userName'] == localStorage.getItem('Username')) {
            let color = ''
            if (data['published']) {
                color = '#000'
            } else {
                color = '#d16704'
            }
            new ListElem(data['Title'], data['Characters'], data['Equations'], data['Images'], color)

            titleToId[data['Title']] = doc.id
        }
    })

    silence = false
})


async function removeProject(title) {
    if (!silence) {
        await deleteDoc(doc(db, 'Lessons', titleToId[title]))

        window.location.href = './mystuff.html'
    }
}

async function uploadProject(title) {
    if (!silence) {
        await updateDoc(doc(db, 'Lessons', titleToId[title]), {
            'published': true
        })
    }

    window.location.href = './mystuff.html'
}

async function returnProject(title) {
    if (!silence) {
        await updateDoc(doc(db, 'Lessons', titleToId[title]), {
            'published': false
        })
    }

    window.location.href = './mystuff.html'
}

const backFade = document.getElementsByClassName('back-fade')[0]
const newLessonForm = document.getElementsByClassName('title-form')[0]
newLessonForm.style.visibility = 'hidden'
newLessonForm.style.opacity = 0

const exitNew = document.getElementsByClassName('cancel-new')[0]
const newEntry = document.getElementsByClassName('w-input')[0]

addButton.addEventListener('click', function() {
    backFade.style.opacity = 0.4
    backFade.style.visibility = 'visible'
    newLessonForm.style.opacity = 1
    newLessonForm.style.visibility = 'visible'
})

exitNew.addEventListener('click', (event) => {
    event.preventDefault()
    newEntry.value = ""

    backFade.style.opacity = 0
    backFade.style.visibility = 'hidden'
    newLessonForm.style.opacity = 0
    newLessonForm.style.visibility = 'hidden'
})

newLessonForm.addEventListener('keyup', async (event) => {
    event.preventDefault()

    if (event.key == 'Enter') {
        let title = newEntry.value

        if (title != "") {
            await createNew(title)
            status('New Lesson Created!', '#0000e1', 'true')
        }

        return false;
    }
})

async function createNew(title) {
    await setDoc(doc(db, "Lessons", title), {
        'Characters': 0,
        'Equations': 0,
        'Images': 0,
        'Title': title,
        'published': false,
        'userName': localStorage.getItem('Username')
    })
}

const statusMessage = document.getElementsByClassName('message')[0];

function status(message, color, v=false) {
    statusMessage.style.opacity = 1
    statusMessage.style.backgroundColor = color
    statusMessage.innerHTML = message
    setTimeout(()=>{
        statusMessage.style.opacity = 0;
        if (v) {
            window.location.href = "../Mystuff/mystuff.html";
        }
    },5000)
}