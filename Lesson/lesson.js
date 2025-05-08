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
dragElem = null

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

                    setCursor(currentElem.textContent.length);
                }
            }
        } else if (e.key == 'q' && e.ctrlKey) {
            e.preventDefault()

            removeRange()
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

function setCursor(pos) {
    // Creates range object
    let setpos = document.createRange();
    
    // Creates object for selection
    let set = window.getSelection();
    
    // Set start position of range
    setpos.setStart(currentElem.childNodes[0], pos);
    
    // Collapse range within its boundary points
    // Returns boolean
    setpos.collapse(true);
    
    // Remove all ranges set
    set.removeAllRanges();
    
    // Add range with respect to range object.
    set.addRange(setpos);
    
    // Set cursor on focus
    currentElem.focus();
}

function getCursor() {
    let set = window.getSelection();

    return set.getRangeAt(0).startOffset
}

function removeRange() {
    let set = window.getSelection();

    let start = set.getRangeAt(0).startOffset
    let end = set.getRangeAt(0).endOffset

    text = ""

    for (let i = 0; i < currentElem.textContent.length; i++) {
        if (i < start || i >= end) {
            text += currentElem.textContent[i]
        }
    }

    currentElem.textContent = text
    setCursor(start)
}

newTextArea()

function newImage(image) {
    if (currentElem.textContent != "") {
        let start = getCursor()
        removeRange()
        let firsthalf = ""
        let secondhalf = ""

        for (let i = 0; i < start; i++) {
            firsthalf += currentElem.textContent[i]
        }

        for (let i = start; i < currentElem.textContent.length; i++) {
            secondhalf += currentElem.textContent[i]
        }

        currentElem.textContent = firsthalf
    }

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

    currentElem.textContent = secondhalf

    // Readjusting image size
    imgContainer.addEventListener('click', () => {
        dragElem = imgContainer

        if (imgContainer.style.borderColor == "rgb(0, 0, 0)") {
            imgContainer.style.border = "3px solid #6d6dff"
            imgContainer.style.padding = "1px"
            currentElem = imgContainer
        } else {
            imgContainer.style.border = "1px solid #000"
            imgContainer.style.padding = "2px"

            let childs = [...content.children]

            for (let i = 0; i < childs.length; i++) {
                if (childs[i] == imgContainer) {
                    currentElem = childs[i+1]
                    currentElem.focus()
                    break
                }
            }
        }
    })

    imgContainer.addEventListener('mousedown', (e) => {
        e.preventDefault()
    })
}


// Adjusting image size

function scale(x) {
    if (currentElem.style.borderColor == "rgb(109, 109, 255)") {
        let rect = currentElem.getBoundingClientRect()

        console.log((x - rect.left).toFixed(2) + "px")
        currentElem.style.width = (x - rect.left).toFixed(2) + "px"
        currentElem.children[0].style.width = (x - rect.left).toFixed(2) + "px"
    } else {
        return
    }
}

document.addEventListener('mousemove', (e) => {
    scale(e.clientX)
})

const edittools = document.getElementsByClassName('edit-tools')[0]
const uploadImg = document.getElementsByClassName('upload-img')[0]
var fileGet = document.getElementsByClassName('file')[0]

uploadImg.addEventListener('click', () => {
    fileGet.click()
})

fileGet.addEventListener('change', () => {
    let images = fileGet.files

    uploadImg.textContent = 'Upload Image'
    let inp = document.createElement('input')
    inp.value = "Click"
    inp.multiple = "multiple"
    inp.accept = "image/png, image/jpeg, image/jpg"
    inp.class = "file"
    inp.type = "file"
    //uploadImg.appendChild(inp)
    
    edittools.removeChild(fileGet)
    edittools.insertBefore(inp, align)

    //uploadImg.innerHTML = 'Upload Image<input multiple="multiple" accept="image/png, image/jpeg, image/jpg" class="file", type="file">'
    fileGet = document.getElementsByClassName('file')[0]
    content.style.backgroundColor = "#000"

    for (let i = 0; i < images.length; i++) {
        newImage(images[i])
    }
})

const align = document.getElementsByClassName('alignment')[0]