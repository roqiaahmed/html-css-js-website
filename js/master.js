let landingPage = document.querySelector(".landing-page");
let mainColor = localStorage.getItem("color");
let listColor = document.querySelectorAll(".colors-list li");
let randomBack = document.querySelectorAll(".random-backgrounds span");
let intervalBackground;
let backgroundOpsion = true;
let backlocalItem = localStorage.getItem("background");
let bulletItem = localStorage.getItem("show-bulltes");
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletContainer = document.querySelector(".nav-bullets");
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main--color', mainColor);
    
    listColor.forEach(element => { 
        element.classList.remove("active");
        if (element.dataset.color == mainColor) {
            element.classList.add("active")
        }
    });

}
if (bulletItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active")
    });
    if (bulletItem === "yes") {
        bulletContainer.style.display = 'block'
        document.querySelector(".bullets-option span.yes").classList.add("active")
    } else {
        bulletContainer.style.display = 'none'
        document.querySelector(".bullets-option span.no").classList.add("active")
    }
}

if (backlocalItem !== null) {
    if (backlocalItem === "true") {
        backgroundOpsion = true;
        randomBacksground ()
    } else {
        backgroundOpsion = false;
    }
}
document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
    if (backlocalItem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active")
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active")
    }
})
document.querySelector(".toggel-setting").onclick = function () {
    document.querySelector(".toggel-setting .fa-gear").classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
}


listColor.forEach(li => {
    li.addEventListener("click", e => {
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);
        localStorage.setItem("color", e.target.dataset.color);
        handelActive(e)
    })
});

randomBack.forEach(span => {
    span.addEventListener("click", e => {
        handelActive(e)
        if (e.target.dataset.background == "yes") {
            backgroundOpsion = true;
            randomBacksground ()
            localStorage.setItem("background", true)
        }else {
            backgroundOpsion = false;
            clearInterval(intervalBackground)
            localStorage.setItem("background", false)
        }
    })
})


let img = ["pic1.jpg", "pic2.jpg", "pic3.jpg", "pic4.jpg", "pic5.jpg", "pic6.jpg", "pic7.jpg", "pic8.jpg"];
let imgCount = img.length;

function randomBacksground () {
    if (backgroundOpsion == true) {
        intervalBackground = setInterval(() => {
    let randemNem = Math.floor(Math.random() * img.length);
    landingPage.style.backgroundImage = 'url("imgs/' + img[randemNem] + ' ")'
}, 10000);
}
}

let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;

    if (skillsOffsetTop > ( windowHeight + skillsOuterHeight -  windowScrollTop)) {
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

    allSkills.forEach(skill => {

    skill.style.width = skill.dataset.progress;
});
}
};


var sliderImages = Array.from(document.querySelectorAll('.gellary .img-box img'));
var slidesCount = sliderImages.length;
var currentSlide = 1;
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('prev');

nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

function nextSlide(){
    if (nextButton.classList.contains('disabled')) {
        return false
    } else {
        currentSlide++
        theChecker()
    }
}
function prevSlide(){
    if (prevButton.classList.contains('disabled')) {
        return false
    } else {
        currentSlide--
        theChecker()
    }
}

function theChecker(){

    removeAllActive()
    sliderImages[currentSlide - 1].classList.add('active');

    if (currentSlide == 1) {
        prevButton.classList.add('disabled')
    }else {
        prevButton.classList.remove('disabled')
    }
    if (currentSlide == slidesCount) {
        nextButton.classList.add('disabled')
    }else {
        nextButton.classList.remove('disabled')
    }
}
function removeAllActive() {

    sliderImages.forEach(function (img) {
    img.classList.remove('active')
    });
;}



let ourGellary = document.querySelectorAll(".gellary img");

ourGellary.forEach(img => {
    img.addEventListener('click', (e) => {
        console.log(img.src);
        let overLay = document.createElement("div");
        overLay.className = "popup-overlay";
        document.body.appendChild(overLay);
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";
        let heading = document.createElement("h3");
        let headingText = document.createTextNode(img.alt);
        heading.appendChild(headingText);
        popupBox.appendChild(heading);
        let closeButtom = document.createElement("span");
        closeButtom.className = "close-button";
        let closeText = document.createTextNode("x");
        closeButtom.appendChild(closeText);
        popupBox.appendChild(closeButtom);
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        popupBox.appendChild(popupImg)
        document.body.appendChild(popupBox);
    })
})

document.addEventListener("click", (e) => {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
})

const bulltes = document.querySelectorAll(".nav-bullets .bullet");
const links = document.querySelectorAll(".links a");
scrolling(bulltes);
scrolling(links);

function scrolling(element) {

    element.forEach(ele => {
        
    ele.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        })
        if (e.target.classList.contains('bullet')) {
            handelActive(e);
    
        }
    })

})
}

function handelActive(para) {
    para.target.parentElement.querySelectorAll(".active").forEach(element => { 
        element.classList.remove("active")
    });

    para.target.classList.add("active")
}


bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (e.target.dataset.display === "yes") {
            bulletContainer.style.display = 'block'
        } else {
            bulletContainer.style.display = 'none'
        }
        localStorage.setItem("show-bulltes", e.target.dataset.display);
        handelActive(e);
    })
})

document.querySelector(".reset-options").onclick = function () {
    localStorage.clear();
    window.location.reload();
};

let toogleBtn = document.querySelector(".header .list-container .toggel-menu");
let tLinks = document.querySelector(".landing-page .header .links");

toogleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}

document.addEventListener("click", (e) => {
    if (e.target !== tLinks & e.target !== toogleBtn) {
        if (tLinks.classList.contains("open")) {
            toogleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
})

tLinks.onclick = function (e) {
    e.stopPropagation();
}
