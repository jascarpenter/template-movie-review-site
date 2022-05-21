'use strict'

// VARIABLES //

const mainHeader = document.querySelector('header');
const mainHeaderLink = document.querySelector('header').getElementsByTagName('a');
const mainHeaderShadow = document.querySelector('.nav-shadow');
const languageSelect = document.querySelectorAll('.lang');
const menuBurger = document.querySelector('.burger');

// AT START UP //

document.addEventListener('DOMContentLoaded', init);

function init() {
    highlightCurrentLanguage();
    showContent();
}

// EVENT LISTENERS //

// Change header background color based on screen width
function headerColorChange(windowWidth) {
    if (windowWidth.matches) { // If media query matches
        headerBgWhite();
    } else {
        headerBgTransparent();
    }
}

var windowWidth = window.matchMedia('(max-width: 886px)')
headerColorChange(windowWidth) // Call listener function at run time
windowWidth.addListener(headerColorChange)

// Change Menu Burger icon to X when clicked
function toggleMenu() {
   this.classList.toggle("change");
}

menuBurger.addEventListener("click", toggleMenu);

// Change Header on scroll
var prevScrollPos = window.pageYOffset;
window.onscroll = function() {
    changeHeaderColorOnScroll();
    hideHeaderOnScroll();
}

// Allow X to be toggled with Enter key
function handleKeys(evt)
   {
      if(evt.keyCode === 13) /*13 is the keyCode for the 'Enter' key*/
      {
        var lgnBtn = document.getElementById('toggle');
        checked = true;
      }
   }

document.addEventListener('keydown', handleKeys, true);

// Add active class to the sorting
let main = document.getElementById('#sorting');
let sortBtns = document.querySelectorAll('.sort');

for (let i = 0; i < sortBtns.length; i++) {
    sortBtns[i].addEventListener('click', function() {
        let current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace(' active', '');
        this.className += ' active';
    });
}

// reveal content on scroll (lazy loading)
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);
window.addEventListener('click', reveal);
window.addEventListener('resize', reveal);

function reveal(){
    let reveals = document.querySelectorAll('#galleryall .box');

    for(let i = 0; i < reveals.length; i++){

        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 50;

        if (revealTop < windowHeight - revealPoint){
            reveals[i].classList.add('activebox');
            reveals[i].style.opacity += 1;
            reveals[i].style.transform = "translateY(0px)";
        } else {
            reveals[i].classList.remove('activebox');
            reveals[i].style.opacity += 0;
            reveals[i].style.transform = "translateY(100px)";
        }
    }
}

// FUNCTIONS //

function hideContent() {
    document.querySelector('.langnav').style.display = 'none';
}

function showContent() {
    document.querySelector('#sorting').style.visibility = 'visible';
    document.querySelector('.filter-tags').style.display = 'flex';
}

function headerBgTransparent() {
    mainHeader.style.backgroundColor = 'transparent';
    for (var i = 0; i < 5; i++) {
        mainHeaderLink[i].style.color = '#445F7A';
    }
}

function headerBgWhite() {
    mainHeader.style.backgroundColor = '#F8FAEB';
    for (var i = 0; i < 5; i++) {
        mainHeaderLink[i].style.color = '#445F7A';
    }
}

function highlightCurrentLanguage() {
    if (document.documentElement.lang == "en") {
        mainHeaderLink[5].style.fontWeight = 'bolder';
        mainHeaderLink[5].style.textDecoration = 'underline 3px';
        mainHeaderLink[6].style.color = '#ccc';
        languageSelect[1].style.border = '1px solid #ccc';
        languageSelect[1].style.backgroundColor = 'transparent';
    } else if (document.documentElement.lang == "ja") {
        mainHeaderLink[6].style.fontWeight = 'bolder';
        mainHeaderLink[6].style.textDecoration = 'underline 3px';
        mainHeaderLink[5].style.color = '#ccc';
        languageSelect[0].style.border = '1px solid #ccc';
        languageSelect[0].style.backgroundColor = 'transparent';
    }
}

function changeHeaderColorOnScroll() {
    if (window.innerWidth <= 886) return;

    if (window.pageYOffset > 50){
        headerBgWhite();
    } else {
        headerBgTransparent();
   }
}

function hideHeaderOnScroll() {
    var currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        mainHeader.style.top = '0';
    } else {
        mainHeader.style.top = '-60px';
        document.getElementById('toggle').checked = false;
        menuBurger.classList.remove('change');
    }
    prevScrollPos = currentScrollPos;
}

// sort gallery by upload date

function sortNew() {
    let parent = document.getElementById('galleryall');
    let sortNew = parent.querySelectorAll('.box');
    let divs = [];
    for (let i = 0; i < sortNew.length; ++i) {
        divs.push(sortNew[i]);
    }
    divs.sort(function(b, a) {
        return +a.children[0].children[1].children[4].getAttribute("datetime").replace(/-/g,'') - +b.children[0].children[1].children[4].getAttribute("datetime").replace(/-/g,'');
    });
    let br = parent.getElementsByTagName('br')[0];
    divs.forEach(function(el) {
        parent.appendChild(el, br);
    });
}

//sort gallery by year

function sortYear() {
    let parent = document.getElementById('galleryall');
    let sortYear = parent.querySelectorAll('.box');
    let divs = [];
    for (let i = 0; i < sortYear.length; ++i) {
        divs.push(sortYear[i]);
    }
    divs.sort(function(b, a) {
        return +a.children[0].children[1].children[2].innerHTML.substring(1,5) - +b.children[0].children[1].children[2].innerHTML.substring(1,5);
    });
    let br = parent.getElementsByTagName('br')[0];
    divs.forEach(function(el) {
        parent.appendChild(el, br);
    });
}

// sort gallery by alphabet

function sortAbc() {
  let list, i, switching, b, shouldSwitch;
  list = document.getElementById('galleryall');
  switching = true;
  while (switching) {
    switching = false;
    b = list.querySelectorAll('.box');
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].children[0].children[1].children[1].innerHTML.toLowerCase() > b[i + 1].children[0].children[1].children[1].innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

// filter gallery by tags

let box = document.querySelectorAll('.box');
let tag = document.querySelectorAll('button.tag');

function showAll() {
    for (let x of box) { (x.style.display === 'none') ? x.style.display = 'block' : x.style.display = 'block'
    }
};

tag.forEach((filter) => {
    filter.addEventListener('click', function filterTag(e) {
        for (let x of box) {
        if (x.style.display === 'none') {
            x.style.display = 'none';
        } else {
            x.style.display = 'none';
        }
    }
        for (let x of box) {
            if (Array.from(x.children[0].children[1].children[0].children, ({textContent}) => textContent.trim().toLowerCase()).includes(e.target.innerText.toLowerCase())) {
                x.style.display = 'block';
            } else {
                x.style.display = 'none';
            }
        }
    });
});