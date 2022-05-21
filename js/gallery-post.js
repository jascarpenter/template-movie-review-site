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
    document.querySelector('.gallery-post-nav').style.display = 'block';
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

// Add dynamic links to gallery-post nav
function firstPrevNextLastNav() {
    const li = document.createElement('li');
    const link = document.createElement('a');
    const ul = document.querySelector('ul');
    const navNewest = document.querySelector('#page-nav').firstElementChild.firstElementChild.firstElementChild.firstElementChild;
    const navNew = document.querySelector('#page-nav').firstElementChild.firstElementChild.children[1].firstElementChild;
    const navOld = document.querySelector('#page-nav').firstElementChild.firstElementChild.children[2].firstElementChild;
    const navOldest = document.querySelector('#page-nav').firstElementChild.firstElementChild.lastElementChild.firstElementChild;

    let pages = ['ghost-movie-review.html', 'drama-movie-review.html', 'action-movie-review.html', 'classic-movie-review.html', 'feel-good-movie-review.html', 'sexy-movie-review.html', 'violent-movie-review.html', 'horror-movie-review.html', 'monster-movie-review.html', 'funny-movie-review.html', 'dreamy-movie-review.html', 'sobering-movie-review.html', 'gritty-movie-review.html', 'lgbtq-movie-review.html', 'magical-movie-review.html'];
    let pathname = document.location.pathname;
    let part = pathname.substr(pathname.lastIndexOf('/') + 1);

    navNewest.setAttribute('href', pages[0]);

    if (navNewest.href.substr(navNewest.href.lastIndexOf('/') + 1) == part) {
       navNewest.style.display = 'none';
    }

    for (var i = 0; i < pages.length; i++) {
        if (window.location.href.indexOf(pages[i]) > -1) {
            navNew.setAttribute('href', pages[i-1]);
        }
    }

    if (navNew.href.substr(navNewest.href.lastIndexOf('/') + 1) == ('undefined')) {
       navNew.style.display = 'none';
    }

    for (var i = 0; i < pages.length; i++) {
        if (window.location.href.indexOf(pages[i]) > -1) {
            navOld.setAttribute('href', pages[i+1]);
        }
    }

    if (navOld.href.substr(navOldest.href.lastIndexOf('/') + 1) == ('undefined')) {
       navOld.style.display = 'none';
    }

    navOldest.setAttribute('href', pages.slice(-1)[0]);

    if (navOldest.href.substr(navOldest.href.lastIndexOf('/') + 1) == part) {
       navOldest.style.display = 'none';
    }
};

window.addEventListener('load', firstPrevNextLastNav);

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