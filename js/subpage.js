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

// FUNCTIONS //

function hideContent() {
    document.querySelector('.langnav').style.display = 'none';
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

function required(e) {
    const emptyEmail = document.forms["contact-form"]["email"].value;
    const emptyMessage = document.forms["contact-form"]["message"].value;
    const inputError = document.querySelectorAll('.input-error');
    if (emptyEmail === "") {
    e.preventDefault();
    inputError[0].style.display = 'block';
    inputError[2].style.display = 'block';
    return false;
    }
    else if (emptyMessage === "") {
        e.preventDefault();
        inputError[1].style.display = 'block';
        inputError[2].style.display = 'block';
        return false;
    } else {
        inputError[0].style.display = 'none';
        inputError[1].style.display = 'none';
    return true; 
    }
}