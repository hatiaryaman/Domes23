const logoutNav = document.getElementsByClassName('logout')[0]
const mainNav = document.getElementsByClassName('main')[0]
const signUpNav = document.getElementsByClassName('signup')[0]
const loginNav = document.getElementsByClassName('login')[0]
const userNav = document.getElementsByClassName('userName')[0]
const learnNav = document.getElementsByClassName('learn')[0]
const shareNav = document.getElementsByClassName('share')[0]
const stuffNav = document.getElementsByClassName('mystuff')[0]
const accountNav = document.getElementsByClassName('myaccount')[0]

mainNav.addEventListener('click', function() {
    window.location.href = '../Home/home.html'
})

learnNav.addEventListener('click', function() {
    window.location.href = '../Learn/learn.html'
})

shareNav.addEventListener('click', function() {
    if (userName == null) {
        window.location.href = '../Login/login.html'
    }
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

    window.location.href = "../Lesson/lesson.html"
})

var userName = localStorage.getItem('Username')
    
if (userName != null) {
    loginNav.style.display = "none"
    signUpNav.style.display = "none"
    userNav.innerHTML = userName

    document.getElementsByClassName('div-block-3')[0].style.display = "none"
} else {
    userNav.style.display = "none"
    document.getElementsByClassName('user')[0].style.display = "none"
}

const lessonTitle = document.getElementsByClassName('text-block-14')[0]
lessonTitle.innerHTML = localStorage.getItem('title')

// Document Editor
// Change system

const content = document.getElementsByClassName('content')[0]
/*content.addEventListener('click', () => {
    content.lastChild.focus()
})*/

document.addEventListener('keydown', (e) => {
    if (e.key == "z") {
        console.log(content.children)
    }
})

currentElem = null

function newTextArea() {
    let area = document.createElement('p')
    area.contentEditable = true
    area.setAttribute('class', 'lesson-doc')

    area.addEventListener('click', () => {
        currentElem = area
    })

    area.addEventListener('keydown', (e) => {
        let childs = [...content.children]

        if (e.key == "Backspace" && childs.length > 1) {
            if (area.textContent == "") {
                let pre = null

                if (childs.length > 1) {
                    for (let i = 0; i < childs.length; i++) {
                        if (childs[i] == currentElem) {
                            pre = childs[i - 1]
                            break
                        }
                    }
                }

                content.removeChild(area)

                currentElem = pre
                
                if (currentElem.textContent == "") {
                    let pre = null

                    if (childs.length > 1) {
                        for (let i = 0; i < childs.length; i++) {
                            if (childs[i] == currentElem) {
                                pre = childs[i - 1]
                                break
                            }
                        }
                    }

                    content.removeChild(currentElem)

                    currentElem = pre

                    if (currentElem == null) {
                        newTextArea()
                    }

                    currentElem.focus()
                }
            }
        }
    })

    let childs = [...content.children]

    if (currentElem == null || childs[childs.length - 1] == currentElem) {
        content.appendChild(area)
    } else {
        let after = null
        for (let i = 0; i < childs.length; i++) {
            if (childs[i] == currentElem) {
                after = childs[i+1]
                break
            }
        }

        content.insertBefore(area, after)
    }

    currentElem = area

    currentElem.focus()
}

newTextArea()

function newImage(image) {
    try {
        if (currentElem.textContent == "") {
            let childs = [...content.children]

            let pre = null

            if (childs.length > 1) {
                for (let i = 0; i < childs.length; i++) {
                    if (childs[i] == currentElem) {
                        pre = childs[i - 1]
                        break
                    }
                }
            }

            content.removeChild(currentElem)
            currentElem = pre
        }
    } catch {

    }

    let imgContainer = document.createElement('div')
    imgContainer.setAttribute('class', 'image-layer')
    imgContainer.style.border = "1px solid #000"

    let imageHold = document.createElement('img')
    imageHold.setAttribute('src', URL.createObjectURL(image))

    imgContainer.appendChild(imageHold)

    let childs = [...content.children]

    if (currentElem == null || childs[childs.length - 1] == currentElem) {
        content.appendChild(imgContainer)
    } else {
        let after = null
        for (let i = 0; i < childs.length; i++) {
            if (childs[i] == currentElem) {
                after = childs[i+1]
                break
            }
        }

        content.insertBefore(imgContainer, after)
    }

    currentElem = imgContainer

    newTextArea()

    // Readjusting image size
    imgContainer.addEventListener('click', () => {
        if (imgContainer.style.borderColor == "rgb(0, 0, 0)") {
            imgContainer.style.border = "1px solid #0000ff"
        } else {
            imgContainer.style.border = "1px solid #000"
        }
    })

    imgContainer.addEventListener('mousemove', (e) => {
        if (imgContainer.style.borderColor == "rgb(0, 0, 255)") {
            let rect = imgContainer.getBoundingClientRect()

            console.log((e.clientX - rect.left).toFixed(2) + "px")
            imgContainer.style.width = (e.clientX - rect.left).toFixed(2) + "px"
            imgContainer.children[0].style.width = (e.clientX - rect.left).toFixed(2) + "px"
        }
    })
}

const uploadImg = document.getElementsByClassName('upload-img')[0]
const fileGet = document.getElementsByClassName('file')[0]

uploadImg.addEventListener('change', () => {
    let images = fileGet.files

    for (let i = 0; i < images.length; i++) {
        newImage(images[i])
    }
})